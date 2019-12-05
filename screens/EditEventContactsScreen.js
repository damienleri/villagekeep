import React from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
  Spinner,
  Select,
  Datepicker
} from "@ui-kitten/components";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
// import { Appearance } from "react-native-appearance";
// const colorScheme = Appearance.getColorScheme();

import Button from "../components/Button";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import {
  getCurrentUser,
  createEventWithContacts,
  updateEvent,
  deleteEvent
} from "../utils/api";
import { gutterWidth, colors } from "../utils/style";
import { formatPhone, getFormattedNameFromContact } from "../utils/etc";

const generateEventTitle = () =>
  `Event created ${moment().format("ddd [at] ha")}`;

export default class EditEventContactsScreen extends React.Component {
  constructor(props) {
    super(props);
    const event = props.navigation.getParam("event");
    this.state = {
      isLoading: false,
      contacts: event ? event.contacts.items : [],
      contactIdIsSelected: {} // hash of {id1: true, id2: false} etc
    };
  }

  handleSubmit = async () => {
    const { contactIdIsSelected } = this.state;
    const event = this.props.navigation.getParam("event");
    const user = this.props.navigation.getParam("user");
    const selectedContacts = user.contacts.items.filter(
      c => contactIdIsSelected[c.id]
    );
    this.setState({ isSubmitting: true });
    if (event) {
      /* Update mode */
      console.log("updating event id", event.id);
      const {
        event: updatedEvent,
        error: updateEventError
      } = await updateEvent({
        id: event.id,
        contacts: selectedContacts
      });
      if (updateEventError) {
        this.setState({
          errorMessage: updateEventError,
          isSubmitting: false
        });
        return;
      }
      console.log("updated event", updatedEvent);
      this.props.navigation.navigate("Events");
    } else {
      /* Create mode */
      const { event, error: createEventError } = await createEventWithContacts({
        userId: user.id,
        title: generateEventTitle(),
        contacts: selectedContacts
      });
      if (createEventError) {
        this.setState({
          errorMessage: createEventError,
          isSubmitting: false
        });
        return;
      }
      console.log("created event with contacts", { eventId: event.id });

      this.props.navigation.navigate("Event", { user, event });
    }
  };

  handleSelectContact = contact => {
    const { contactIdIsSelected } = this.state;
    this.setState({
      contactIdIsSelected: {
        ...contactIdIsSelected,
        [contact.id]: !contactIdIsSelected[contact.id]
      }
    });
  };

  renderAvatar = style => <Icon {...style} name="person" />;

  renderAccessory = ({ style, isChecked, contact }) => {
    return (
      <Ionicons
        name={isChecked ? "md-checkmark-circle-outline" : "md-radio-button-off"}
        size={28}
        color={colors.brandColor}
        style={{ marginHorizontal: 10 }}
      />
    );
  };
  renderListItem = ({ item: contact, index }) => {
    const { contactIdIsSelected } = this.state;
    const isChecked = contactIdIsSelected[contact.id];
    const description = ""; // last used in an event by me?
    let titleStyle = Object.assign({}, titleStyle);
    if (isChecked) titleStyle.color = colors.brandColor;
    let descriptionStyle = Object.assign({}, descriptionStyle);
    if (isChecked) descriptionStyle.color = colors.brandColor;

    // icon={this.renderAvatar}

    return (
      <ListItem
        style={styles.listItem}
        title={getFormattedNameFromContact(contact)}
        titleStyle={titleStyle}
        description={description}
        descriptionStyle={descriptionStyle}
        onPress={() => this.handleSelectContact(contact)}
        accessory={style => this.renderAccessory({ style, isChecked, contact })}
      />
    );
  };
  renderList = () => {
    const user = this.props.navigation.getParam("user");

    return (
      <List
        style={styles.list}
        data={user.contacts.items}
        renderItem={this.renderListItem}
      />
    );
  };

  render() {
    const { contactIdIsSelected, errorMessage, isSubmitting } = this.state;
    const numContactsSelected = Object.keys(contactIdIsSelected).length;

    return (
      <Layout style={styles.container}>
        <View style={styles.intro}>
          <Text>Choose one or more people you expect at this event.</Text>
        </View>
        {this.renderList()}

        {errorMessage && (
          <Text style={styles.errorMessage} status="danger">
            {errorMessage}
          </Text>
        )}
        <Button
          style={styles.submitButton}
          disabled={!numContactsSelected || isSubmitting}
          onPress={this.handleSubmit}
        >
          {isSubmitting ? "Continuing" : "Continue"}
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errorMessage: {
    marginHorizontal: gutterWidth,
    marginBottom: 100
  },
  intro: { marginHorizontal: gutterWidth, marginVertical: 20 },
  list: {
    marginHorizontal: gutterWidth
  },
  listItem: {
    paddingHorizontal: 0
  },
  titleStyle: {},
  descriptionStyle: {},
  submitButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: gutterWidth,
    bottom: gutterWidth
  }
});

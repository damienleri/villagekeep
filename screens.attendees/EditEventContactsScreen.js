import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
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
  updateEventAttendees,
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
    const user = props.navigation.getParam("user");
    console.log(`constructor() on EditEventContactsScreen`, event);
    // const contacts = event
    //   ? event.contacts.items.filter(c => c.id !== user.contact.id)
    //   : []; // remove user's own conact for now
    const contacts = event ? event.attendees.items.map(c => c.contact.id) : [];
    const aryToHash = ary => {
      let hash = {};
      ary.forEach(el => {
        hash[el] = true;
      });
      return hash;
    };
    this.state = {
      isLoading: false,
      event,
      contacts,
      contactIdIsSelected: aryToHash(contacts)
      // hash of {id1: true, id2: false} etc
    };
  }

  handleSubmit = async () => {
    const { event, contactIdIsSelected } = this.state;
    const user = this.props.navigation.getParam("user");
    const returnToEvents = this.props.navigation.getParam("returnToEvents");
    const selectedContacts = user.contacts.items.filter(
      c => contactIdIsSelected[c.id]
    );
    // const contacts = selectedContacts.concat(user.contact); // Add user's own contact
    const contacts = selectedContacts;
    this.setState({ isSubmitting: true });

    if (event) {
      /* Update mode */

      const {
        event: updatedEvent,
        error: updateError
      } = await updateEventAttendees({
        event,
        contacts,
        user
      });
      if (updateError) {
        this.setState({
          errorMessage: updateError,
          isSubmitting: false
        });
        return;
      }
      console.log(updatedEvent.attendees.items.length);
      if (returnToEvents) {
        this.props.navigation.navigate("Events");
      } else {
        this.props.navigation.navigate("Event", { user, event: updatedEvent });
      }
    } else {
      /* Create mode */

      // todo:
      // Handle the user clicking Back button to this screen:
      // check if event exists and then update contacts only

      const { event, error: createEventError } = await createEventWithContacts({
        user,
        title: generateEventTitle(),
        contacts
      });
      if (createEventError) {
        this.setState({
          errorMessage: createEventError,
          isSubmitting: false
        });
        return;
      }
      console.log("created event with contacts", { eventId: event.id });
      this.setState({ event, isSubmitting: false }); // in case use clicks back to to this page
      this.props.navigation.navigate("Event", {
        user,
        event,
        isNewEvent: true
      });
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
    // <ListItem
    //   style={styles.listItem}
    //   title={getFormattedNameFromContact(contact)}
    //   titleStyle={titleStyle}
    //   description={description}
    //   descriptionStyle={descriptionStyle}
    //   accessory={style =>
    //     this.renderAccessory({ style, isChecked, contact })
    //   }
    // />
    // icon={this.renderAvatar}

    return (
      <TouchableOpacity onPress={() => this.handleSelectContact(contact)}>
        <View style={styles.listItem}>
          <View>
            <Text style={titleStyle}>
              {getFormattedNameFromContact(contact)}
            </Text>
            <Text style={descriptionStyle}>{description}</Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            {this.renderAccessory({ isChecked, contact })}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderList = () => {
    const user = this.props.navigation.getParam("user");
    const { contactIdIsSelected } = this.state;
    return (
      <FlatList
        style={styles.list}
        data={user.contacts.items}
        renderItem={this.renderListItem}
        keyExtractor={contact => contact.id}
        extraData={contactIdIsSelected}
      />
    );
  };

  render() {
    const { contactIdIsSelected, errorMessage, isSubmitting } = this.state;
    const numContactsSelected = Object.keys(contactIdIsSelected).length;

    return (
      <Layout style={styles.container}>
        <View style={styles.intro}>
          <Text>Choose who to include.</Text>
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
    marginVertical: 20,
    marginHorizontal: gutterWidth
  },
  listItem: { flexDirection: "row", justifyContent: "space-between" },
  listItemSeparator: {
    height: 1,
    backgroundColor: colors.brandColor,
    marginVertical: 10
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

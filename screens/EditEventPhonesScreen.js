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
import { uniqBy } from "lodash";
// import { Appearance } from "react-native-appearance";
// const colorScheme = Appearance.getColorScheme();

import Button from "../components/Button";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import {
  getCurrentUser,
  createEventWithPhones,
  updateEventPhones,
  deleteEvent
} from "../utils/api";
import { gutterWidth, colors } from "../utils/style";
import {
  formatPhone,
  getEventPhoneFromUser,
  getEventPhoneFromContact,
  getFormattedNameFromEventPhone
} from "../utils/etc";

const generateEventTitle = () =>
  `Event created ${moment().format("ddd [at] ha")}`;

const aryToHash = ary => {
  let hash = {};
  ary.forEach(el => {
    hash[el] = true;
  });
  return hash;
};

export default class EditEventPhonesScreen extends React.Component {
  constructor(props) {
    super(props);
    const event = props.navigation.getParam("event");
    const user = props.navigation.getParam("user");
    console.log(`constructor() on EditEventPhonesScreen`, event);
    const preselectedEventPhones = event
      ? event.eventPhones.items.filter(ep => ep.phone !== user.phone)
      : [];
    const myContacts = user.contacts.items;
    let possibleEventPhones = uniqBy(
      preselectedEventPhones.concat(myContacts.map(getEventPhoneFromContact)),
      eventPhone => eventPhone.phone
    );
    console.log(
      `${myContacts.length} of my own contacts. ${preselectedEventPhones.length} already in the event. ${possibleEventPhones.length} unique total.`
    );
    this.state = {
      isLoading: false,
      event,
      possibleEventPhones,
      eventPhoneIsSelected: aryToHash(
        preselectedEventPhones.map(ep => ep.phone)
      )
      // hash of {id1: true, id2: false} etc
    };
  }

  handleSubmit = async () => {
    const { event, eventPhoneIsSelected, possibleEventPhones } = this.state;
    const user = this.props.navigation.getParam("user");
    const returnToEvents = this.props.navigation.getParam("returnToEvents");
    const selectedEventPhones = possibleEventPhones.filter(
      c => eventPhoneIsSelected[c.phone]
    );
    const eventPhones = selectedEventPhones.concat(getEventPhoneFromUser(user));
    // console.log(eventPhones);
    this.setState({ isSubmitting: true });

    if (event) {
      /* Update mode */

      const { error: updateError } = await updateEventPhones({
        event,
        eventPhones,
        user
      });
      if (updateError) {
        this.setState({
          errorMessage: updateError,
          isSubmitting: false
        });
        return;
      }

      if (returnToEvents) {
        this.props.navigation.navigate("Events");
      } else {
        this.props.navigation.navigate("Event", { user });
      }
    } else {
      /* Create mode */

      // todo:
      // Handle the user clicking Back button to this screen:
      // check if event exists and then update eventPhones only

      const { event, error: createEventError } = await createEventWithPhones({
        user,
        title: generateEventTitle(),
        eventPhones
      });
      if (createEventError) {
        this.setState({
          errorMessage: createEventError,
          isSubmitting: false
        });
        return;
      }
      console.log("created event with phones", { eventId: event.id });
      this.setState({ event, isSubmitting: false }); // in case use clicks back to to this page
      this.props.navigation.navigate("Event", {
        user,
        event,
        isNewEvent: true
      });
    }
  };

  handleSelectEventPhone = eventPhone => {
    const { eventPhoneIsSelected } = this.state;
    this.setState({
      eventPhoneIsSelected: {
        ...eventPhoneIsSelected,
        [eventPhone.phone]: !eventPhoneIsSelected[eventPhone.phone]
      }
    });
  };

  renderAvatar = style => <Icon {...style} name="person" />;

  renderAccessory = ({ style, isChecked }) => {
    return (
      <Ionicons
        name={isChecked ? "md-checkmark-circle-outline" : "md-radio-button-off"}
        size={28}
        color={colors.brandColor}
        style={{ marginHorizontal: 10 }}
      />
    );
  };
  renderListItem = ({ item: eventPhone }) => {
    const { eventPhoneIsSelected } = this.state;
    const isChecked = eventPhoneIsSelected[eventPhone.phone];
    const description = ""; // last used in an event by me?
    let titleStyle = Object.assign({}, titleStyle);
    if (isChecked) titleStyle.color = colors.brandColor;
    let descriptionStyle = Object.assign({}, descriptionStyle);
    if (isChecked) descriptionStyle.color = colors.brandColor;
    const { firstName, lastName } = eventPhone;
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
      <TouchableOpacity onPress={() => this.handleSelectEventPhone(eventPhone)}>
        <View style={styles.listItem}>
          <View>
            <Text style={titleStyle}>
              {firstName} {lastName}
            </Text>
            <Text style={descriptionStyle}>{description}</Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            {this.renderAccessory({ isChecked })}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderList = () => {
    const user = this.props.navigation.getParam("user");
    const { eventPhoneIsSelected, possibleEventPhones } = this.state;
    return (
      <FlatList
        style={styles.list}
        data={possibleEventPhones}
        renderItem={this.renderListItem}
        keyExtractor={eventPhone => eventPhone.phone}
        extraData={eventPhoneIsSelected}
      />
    );
  };

  render() {
    const { eventPhoneIsSelected, errorMessage, isSubmitting } = this.state;
    const numSelected = Object.keys(eventPhoneIsSelected).length;

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
          disabled={!numSelected || isSubmitting}
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

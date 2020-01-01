import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Icon, Layout, Text, Spinner } from "@ui-kitten/components";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { uniqBy, sortBy } from "lodash";
import Button from "../components/Button";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import {
  createEventWithPhones,
  updateEventPhones
  // deleteEvent
} from "../utils/api";
import { gutterWidth, colors } from "../utils/style";
import {
  formatPhone,
  generateEventPhoneFromUser,
  generateEventPhoneFromContact,
  getFormattedNameFromEventPhone,
  getKidsContacts
} from "../utils/etc";
import { setSettings as setSettingsType } from "../redux/actions";

const generateEventTitle = () =>
  `Started ${moment().format("MMM D [at] h:mma")}`;

const aryToHash = ary => {
  let hash = {};
  ary.forEach(el => {
    hash[el] = true;
  });
  return hash;
};

class EditEventPhonesScreen extends React.Component {
  constructor(props) {
    super(props);
    const event = props.navigation.getParam("event");

    const type = event ? event.type : props.navigation.getParam("type");
    const { settings = {} } = this.props;
    const { user } = settings;

    const preselectedEventPhones = event
      ? event.eventPhones.items.filter(ep => ep.phone !== user.phone)
      : [];

    const contacts = user.isParent
      ? [
          ...sortBy(
            user.contacts.items.filter(c => c.type === "kid"),
            "firstName"
          ),
          ...getKidsContacts(user)
        ]
      : user.contacts.items.filter(c => c.type === "friend");

    const possibleEventPhones = uniqBy(
      preselectedEventPhones.concat(
        contacts.map(generateEventPhoneFromContact)
      ),
      eventPhone => eventPhone.phone
    );
    this.state = {
      isLoading: false,
      event,
      type,
      possibleEventPhones,
      eventPhoneIsSelected: aryToHash(
        preselectedEventPhones.map(ep => ep.phone)
      )
      // hash of {id1: true, id2: false} etc
    };
  }

  handleSubmit = async () => {
    const {
      event,
      type,
      eventPhoneIsSelected,
      possibleEventPhones
    } = this.state;
    const { settings = {}, setSettings } = this.props;
    const { user } = settings;

    const selectedEventPhones = possibleEventPhones.filter(
      c => eventPhoneIsSelected[c.phone]
    );

    const eventPhones = selectedEventPhones.concat(
      generateEventPhoneFromUser(user)
    );

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
      this.props.navigation.goBack();
    } else {
      /* Create mode */

      const { event, error: createEventError } = await createEventWithPhones({
        user,
        title: generateEventTitle(),
        type,
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
    const { eventPhoneIsSelected, type } = this.state;
    const { settings = {} } = this.props;
    const { user } = settings;
    const { firstName, lastName, phone } = eventPhone;

    const isChecked = eventPhoneIsSelected[eventPhone.phone];
    let description = "";
    let title = "";
    if (type === "both") {
      const isMyKid =
        user.contacts.items.findIndex(
          c => c.phone === phone && c.type === "kid"
        ) >= 0;
      title = isMyKid ? firstName : `${firstName} ${lastName} and parents`;
      // description = 'Includes parents'
    } else if (type === "parents") {
      title = `Parents of ${firstName} ${lastName}`;
      // description = ''
    } else if (type === "kids") {
      title = `${firstName} ${lastName}`;
    }

    let titleStyle = Object.assign({}, titleStyle);
    if (isChecked) {
      titleStyle.color = colors.brandColor;
      titleStyle.fontWeight = "bold";
    }
    let descriptionStyle = Object.assign({}, descriptionStyle);
    if (isChecked) descriptionStyle.color = colors.brandColor;

    return (
      <TouchableOpacity onPress={() => this.handleSelectEventPhone(eventPhone)}>
        <View style={styles.listItem}>
          <View>
            <Text style={titleStyle}>{title}</Text>
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
    const { settings = {}, setSettings } = this.props;
    const { user } = settings;
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
    const numSelected = Object.values(eventPhoneIsSelected).filter(val => val)
      .length;

    return (
      <Layout style={styles.container}>
        <View style={styles.intro}>
          <Text category="h5">Choose people to include.</Text>
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

export default connect(({ settings }) => ({ settings }), {
  setSettings: setSettingsType
})(EditEventPhonesScreen);

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

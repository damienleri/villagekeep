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
import Button from "../components/Button";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import {
  getCurrentUser,
  createEvent,
  updateEvent,
  deleteEvent
} from "../utils/api";
import { gutterWidth } from "../utils/style";
import { formatPhone, getFormattedNameFromContact } from "../utils/etc";

export default class EditEventScreen extends React.Component {
  constructor(props) {
    super(props);
    const event = props.navigation.getParam("event");
    this.state = {
      isLoading: false,
      title: event ? event.title : "",
      date: event ? event.date : new Date()
      // selectedContactOption: []
    };
  }

  handleSubmit = async () => {
    const { title } = this.state;
    const event = this.props.navigation.getParam("event");
    // const type = this.props.navigation.getParam("type"); //not used
    const user = this.props.navigation.getParam("user");
    this.setState({ isSubmitting: true });
    if (event) {
      /* Update mode */
      console.log("updating event id", event.id);
      const {
        event: updatedEvent,
        error: updateEventError
      } = await updateEvent({
        id: event.id,
        title
      });
      if (updateEventError) {
        this.setState({
          errorMessage: updateEventError,
          isSubmitting: false
        });
        return;
      }
      console.log("updated event", updatedEvent);
    } else {
      /* Create mode */
      const { event, error: createEventError } = await createEvent({
        userId: user.id,
        title
      });
      if (createEventError) {
        this.setState({
          errorMessage: createEventError,
          isSubmitting: false
        });
        return;
      }
      console.log("created event", event);
    }
    this.props.navigation.goBack();
  };

  handleDelete = async () => {
    const event = this.props.navigation.getParam("event");
    console.log("deleting event", event);
    const { errorMessage } = await deleteEvent({ eventId: event.id });
    if (errorMessage) return this.setState({ errorMessage });
    this.props.navigation.goBack();
  };

  handleDeletePress = () => {
    Alert.alert(
      "Delete this event?",
      "",
      [
        {
          text: "Nevermind",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Delete", onPress: this.handleDelete, style: "destructive" }
      ],
      { cancelable: false }
    );
  };

  handleSelectContact = selectedContactOption => {
    this.setState({ selectedContactOption });
  };
  handleDateChange = date => {
    this.setState({ date });
  };

  render() {
    const {
      errorMessage,
      title,
      isRefreshing,
      isLoading,
      isSubmitting,
      date
    } = this.state;
    const event = this.props.navigation.getParam("event");
    const user = this.props.navigation.getParam("user");
    const { isParent } = user;
    // const type = event ? event.type : navigation.getParam("type");
    const contactsOptions = user.contacts.items.map(c => ({
      text: getFormattedNameFromContact(c)
    }));

    //
    //   <Select
    //     data={contactsOptions}
    //     multiSelect={true}
    //     selectedOption={selectedContactOption}
    //     onSelect={this.handleSelectContact}
    //   />

    return (
      <Layout style={styles.container}>
        {/*<View style={styles.intro}>
          <Text category="h5" style={styles.header}>
            {event ? "Updating event " : "New event "}
          </Text>
          {isParent ? (
            <Text style={styles.introText}></Text>
          ) : (
            <Text style={styles.introText}></Text>
          )}
        </View>
        */}
        <Form>
          <Datepicker date={date} onSelect={this.handleDateChange} />
          <FormInput
            label="What"
            placeholder="A name for the event"
            onChangeText={title =>
              this.setState({ title, errorMessage: false })
            }
            value={title}
            returnKeyType="done"
          />

          {this.renderContacts()}
          {errorMessage && (
            <Text style={styles.errorMessage} status="danger">
              {errorMessage}
            </Text>
          )}
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={!title || isSubmitting}
          >
            {isSubmitting ? "Saving event" : "Save"}
          </FormSubmitButton>

          {event && (
            <Button
              style={styles.deleteButton}
              appearance="ghost"
              status="danger"
              onPress={this.handleDeletePress}
            >
              Delete
            </Button>
          )}
        </Form>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: { marginHorizontal: gutterWidth },
  // header: { marginTop: 20, marginBottom: 10, fontWeight: "normal" },
  introText: { marginBottom: 10 },
  deleteButton: { marginTop: 20 },
  errorMessage: {
    marginTop: 4,
    marginBottom: 8,
    textAlign: "center"
  }
});

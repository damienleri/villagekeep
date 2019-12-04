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
} from "react-native-ui-kitten";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import Button from "../components/Button";
import InlineForm from "../components/InlineForm";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import InlineFormInput from "../components/InlineFormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import InlineFormSubmitButton from "../components/InlineFormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import {
  getCurrentUser,
  createEvent,
  updateEvent,
  deleteEvent
} from "../utils/api";
import { gutterWidth } from "../utils/style";
import { formatPhone, getFormattedNameFromContact } from "../utils/etc";

export default class EventScreen extends React.Component {
  constructor(props) {
    super(props);
    const event = props.navigation.getParam("event");
    this.state = {
      isLoading: false,
      title: event.title
      // date: event ? event.date : new Date()
      // selectedContactOption: []
    };
  }

  handleSubmitTitle = async () => {
    const { title } = this.state;
    const event = this.props.navigation.getParam("event");
    this.setState({ isSubmittingTitle: true });

    console.log("updating title event id", event.id);
    const { event: updatedEvent, error: updateEventError } = await updateEvent({
      id: event.id,
      title
    });
    if (updateEventError) {
      this.setState({
        errorMessage: updateEventError,
        isSubmittingTitle: false
      });
      return;
    }
    console.log("updated event", updatedEvent);

    // this.props.navigation.goBack();
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

        <Datepicker date={date} onSelect={this.handleDateChange} />
        */}
        <InlineForm>
          <InlineFormInput
            label=""
            placeholder="A name for the event"
            onChangeText={title =>
              this.setState({ title, errorMessage: false })
            }
            value={title}
            returnKeyType="done"
          />
          <InlineFormSubmitButton
            onPress={this.handleSubmitTitle}
            disabled={!title || isSubmittingTitle}
          >
            {isSubmittingTitle ? "Saving" : "Save"}
          </InlineFormSubmitButton>
        </InlineForm>

        <Form>
          {errorMessage && (
            <Text style={styles.errorMessage} status="danger">
              {errorMessage}
            </Text>
          )}

          {event && (
            <Button
              style={styles.deleteButton}
              appearance="ghost"
              status="danger"
              onPress={this.handleDeletePress}
            >
              Delete event
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

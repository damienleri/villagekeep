import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Button,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
  Spinner
} from "react-native-ui-kitten";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
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
import { formatPhone } from "../utils/etc";

export default class EditEventScreen extends React.Component {
  constructor(props) {
    super(props);
    const event = props.navigation.getParam("event");
    this.setState({
      isLoading: false,
      title: event ? event.title : ""
    });
  }

  handleSubmit = async () => {
    const { title } = this.state;
    const event = this.props.navigation.getParam("event");
    const type = this.props.navigation.getParam("type");
    this.setState({ isSubmitting: true });
    if (event) {
      /* Update mode */
      console.log("updating event id", event.id);
      const {
        event: updatedEvent,
        error: updateEventError
      } = await updateEvent({
        id: event.id,
        title: event.title,
        type
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
        title,
        type
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

  render() {
    const { navigation } = this.props;
    const {
      errorMessage,
      title,
      isRefreshing,
      isLoading,
      isSubmitting
    } = this.state;
    const event = navigation.getParam("event");
    const user = navigation.getParam("user");
    const { isParent } = user;
    const type = event ? event.type : navigation.getParam("type");

    return (
      <Layout style={styles.container}>
        <View style={styles.intro}>
          <Text category="h5" style={styles.header}>
            {event ? "Let's fix this " : "It's time to add this "}
            {type === "parent" ? "parent/guardian" : type}.
          </Text>
          {isParent ? (
            <Text style={styles.introText}></Text>
          ) : (
            <Text style={styles.introText}>
              Your parents will have access to the names and numbers you add
              here.
            </Text>
          )}
        </View>

        <Form>
          <FormInput
            label="Event name"
            placeholder="Describe what you are doing or have planned"
            onChangeText={title =>
              this.setState({ title, errorMessage: false })
            }
            value={title}
            returnKeyType="done"
          />
          <FormInput
            label="Phone number"
            placeholder=""
            onChangeText={this.handleChangePhone}
            value={phone}
            status={
              !phone.length
                ? null
                : phoneErrorMessage || !validPhone
                ? "danger"
                : "success"
            }
            caption={phoneErrorMessage}
            keyboardType={"phone-pad"}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errorMessage && (
            <Text style={styles.errorMessage} status="danger">
              {errorMessage}
            </Text>
          )}
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={!firstName || !lastName || !validPhone || isSubmitting}
          >
            {isSubmitting ? "Saving contact" : "Save"}
          </FormSubmitButton>

          {contact && (
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
  header: { marginTop: 20, marginBottom: 10, fontWeight: "normal" },
  introText: { marginBottom: 10 },
  deleteButton: { marginTop: 20 },
  errorMessage: {
    marginTop: 4,
    marginBottom: 8,
    textAlign: "center"
  }
});

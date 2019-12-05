import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { Icon, Layout, Text, Spinner, Input } from "@ui-kitten/components";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import moment from "moment";
import Button from "../components/Button";
import InlineForm from "../components/InlineForm";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import InlineFormInput from "../components/InlineFormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import InlineFormCancelButton from "../components/InlineFormCancelButton";
import InlineFormSubmitButton from "../components/InlineFormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { getMessagesForEvent, updateEvent, deleteEvent } from "../utils/api";
import { gutterWidth, colors, topNavigationHeight } from "../utils/style";
import { formatPhone, getFormattedNameFromContact } from "../utils/etc";

export default class EventScreen extends React.Component {
  // static navigationOptions = props => ({
  //   header: <TopNavigation {...props} style={{ height: topNavHeight }} />
  // });
  constructor(props) {
    super(props);
    const event = props.navigation.getParam("event");
    this.state = {
      isLoading: false,
      title: event.title,
      event
      // date: event ? event.date : new Date()
      // selectedContactOption: []
    };
    this.loadMessagesSubcription = this.props.navigation.addListener(
      "didFocus",
      async () => {
        await this.loadMessages();
      }
    );
  }
  componentWillUnmount() {
    this.loadMessagesSubcription.remove();
  }
  loadMessages = async () => {
    const { event } = this.state;
    const { messages, error: messagesError } = await getMessagesForEvent(event);
    if (messagesError)
      return this.setState({
        errorMessage: `Error: ${messagesError}`
      });
    console.log("messages", messages);
    // const events = user.events.items;
    // console.log("events", events);
    this.setState({ messages, messagesAreLoaded: true });
  };
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
    this.setState({ isSubmittingTitle: false, isEditingTitle: false });
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
        { text: "Delete", onPress: this.handleDelete, style: "destructive" },
        {
          text: "Nevermind",
          onPress: () => {},
          style: "cancel"
        }
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

  renderMessage = ({ item: message }) => {
    console.log(message);
    return (
      <View style={styles.message}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.messageAuthor}>Damien</Text>
        <Text style={styles.messageTime}>
          {moment()
            .subtract(1, "d")
            .fromNow()}
        </Text>
      </View>
    );
  };

  renderMessageList = () => {
    const { messages } = this.state;
    return (
      <FlatList
        style={styles.messageList}
        renderItem={this.renderMessage}
        data={messages}
        keyExtractor={message => message.id}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
      />
    );
  };

  renderMessageInput = () => {
    return <Input style={styles.messageInput} />;
  };
  render() {
    const {
      errorMessage,
      title,
      isRefreshing,
      isLoading,
      isEditingTitle,
      isSubmittingTitle,
      messagesAreLoaded
    } = this.state;
    const event = this.props.navigation.getParam("event");
    const user = this.props.navigation.getParam("user");

    return (
      <Layout style={styles.container}>
        {isEditingTitle ? (
          <InlineForm>
            <InlineFormInput
              label=""
              placeholder="A name for the event"
              onChangeText={title =>
                this.setState({ title, errorMessage: false })
              }
              value={title}
              maxLength={50}
              returnKeyType="done"
            />
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <InlineFormSubmitButton
                onPress={this.handleSubmitTitle}
                disabled={!title || isSubmittingTitle}
              >
                {isSubmittingTitle ? "Saving" : "Save"}
              </InlineFormSubmitButton>
              <InlineFormCancelButton
                onPress={() => this.setState({ isEditingTitle: false })}
              >
                Cancel
              </InlineFormCancelButton>
            </View>
          </InlineForm>
        ) : (
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => this.setState({ isEditingTitle: true })}
          >
            <Text style={styles.title}>{title}</Text>
            <Icon
              name="edit-outline"
              width={24}
              height={24}
              fill={colors.brandColor}
            />
          </TouchableOpacity>
        )}

        {errorMessage && (
          <Text style={styles.errorMessage} status="danger">
            {errorMessage}
          </Text>
        )}

        <Form style={styles.messageForm}>
          {!messagesAreLoaded ? <Spinner /> : this.renderMessageList()}
          {this.renderMessageInput()}
        </Form>

        {false && event && (
          <Button
            style={styles.deleteButton}
            appearance="ghost"
            status="danger"
            onPress={this.handleDeletePress}
          >
            Delete event
          </Button>
        )}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: { marginHorizontal: gutterWidth },
  titleContainer: {
    flexDirection: "row",
    marginHorizontal: gutterWidth,
    marginTop: gutterWidth,
    marginBottom: gutterWidth
  },
  title: { fontSize: 18, marginRight: 20 },
  // header: { marginTop: 20, marginBottom: 10, fontWeight: "normal" },
  introText: { marginBottom: 10 },

  messageForm: { paddingHorizontal: 0 },
  messageList: { flex: 1 },
  message: { paddingHorizontal: gutterWidth, paddingVertical: 10 },
  messageText: {},
  messageAuthor: {},
  messageTime: { color: "#aaa", fontSize: 13 },
  messageInput: { borderWidth: 0 },

  deleteButton: { marginTop: 20 },
  errorMessage: {
    marginHorizontal: gutterWidth,
    marginVertical: gutterWidth,
    textAlign: "center"
  }
});

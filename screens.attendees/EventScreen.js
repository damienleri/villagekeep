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
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import {
  Icon,
  Layout,
  Text,
  Spinner,
  Input,
  OverflowMenu
} from "@ui-kitten/components";
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
import {
  getEventByIdWithMessages,
  updateEvent,
  deleteEvent,
  createMessage
} from "../utils/api";
import { gutterWidth, colors, topNavigationHeight } from "../utils/style";
import {
  formatPhone,
  getFormattedNameFromContact,
  getFormattedNameFromUser
} from "../utils/etc";

export default class EventScreen extends React.Component {
  // static navigationOptions = props => ({
  //   header: <TopNavigation {...props} style={{ height: topNavHeight }} />
  // });
  constructor(props) {
    super(props);
    const event = props.navigation.getParam("event");
    console.log(`constructor() on EventScreen`);
    this.messageInputRef = React.createRef();
    this.state = {
      title: event.title,
      event
      // isLoading: false,
      // title: event.title,
      // event
    };
    this.loadEventSubcription = this.props.navigation.addListener(
      "didFocus",
      async () => {
        await this.loadEventWithMessages();
      }
    );
  }
  async componentDidMount() {
    const isNewEvent = this.props.navigation.getParam("isNewEvent");
    if (isNewEvent) this.messageInputRef.current.focus();
    // await this.loadEventWithMessages();
  }
  componentWillUnmount() {
    this.loadEventSubcription.remove();
  }
  loadEventWithMessages = async () => {
    const eventParam = this.props.navigation.getParam("event");
    console.log("**loading event with all messages");

    const { event, error: eventError } = await getEventByIdWithMessages(
      eventParam.id
    );
    if (eventError)
      return this.setState({
        errorMessage: eventError
      });
    console.log("**loaded event");

    // const events = user.events.items;
    console.log("event", event);
    this.setState({ event, messagesAreLoaded: true });
  };
  // loadMessages = async () => {
  //   const { event } = this.state;
  //   const { messages, error: messagesError } = await getMessagesForEvent(event);
  //   if (messagesError)
  //     return this.setState({
  //       errorMessage: `Error: ${messagesError}`
  //     });
  //   console.log("messages", messages);
  //   // const events = user.events.items;
  //   // console.log("events", events);
  //   this.setState({ messages, messagesAreLoaded: true });
  // };
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
    this.setState({ isLoading: true });

    const { error: errorMessage } = await deleteEvent({ eventId: event.id });
    if (errorMessage) {
      this.setState({ errorMessage });
      return;
    }
    this.props.navigation.goBack();
  };

  handleDeletePress = () => {
    this.setState({ showMoreActions: false });
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

  // handleSelectContact = selectedContactOption => {
  //   this.setState({ selectedContactOption });
  // };
  // handleDateChange = date => {
  //   this.setState({ date });
  // };

  renderMessage = ({ item: message }) => {
    return (
      <View style={styles.message}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.messageTime}>
          {moment(message.createdAt).fromNow()} by{" "}
          <Text style={styles.messageAuthor}>
            {getFormattedNameFromUser(message.user)}
          </Text>
        </Text>
      </View>
    );
  };

  renderMessageList = () => {
    const { event } = this.state;
    const messages = event.messages.items;
    // const messages = [
    //   { text: "blah", id: "1" },
    //   { text: "another test!", id: "2" }
    // ];
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

  handleMessageSubmit = async () => {
    const { inputText = "", event } = this.state;
    const user = this.props.navigation.getParam("user");
    if (!inputText.length) return;
    const { error: createMessageError, message } = await createMessage({
      text: inputText,
      event,
      user
    });
    if (createMessageError) {
      this.setState({ errorMessage: createMessageError });
      return;
    }
    console.log("created message", message);
    this.setState({ inputText: "" });
  };

  renderMessageInputRow = () => {
    const { inputText } = this.state;
    return (
      <View style={styles.messageInputRow}>
        <TextInput
          style={styles.messageInput}
          value={inputText}
          onChangeText={inputText => this.setState({ inputText })}
          onSubmitEditing={this.handleMessageSubmit}
          ref={this.messageInputRef}
          returnKeyType="send"
          placeholder="Type message"
          placeholderTextColor={colors.brandColor}
        />
        <TouchableOpacity
          onPress={this.handleMessageSubmit}
          style={styles.messageSubmitContainer}
        >
          <View style={styles.messageSubmitButton}>
            <Icon
              name="arrow-upward"
              fill={colors.brandColor}
              height={40}
              width={40}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  handleAddPerson = () => {
    const { event } = this.state;
    this.setState({ showMoreActions: false });
    const user = this.props.navigation.getParam("user");
    this.props.navigation.navigate("EditEventContacts", { event, user });
  };
  render() {
    const {
      errorMessage,
      title,
      isRefreshing,
      isLoading,
      isEditingTitle,
      isSubmittingTitle,
      messagesAreLoaded,
      showMoreActions
    } = this.state;

    const moreActionsData = [
      {
        title: "Add person",
        icon: style => <Icon {...style} name="person-add" />,
        onPress: this.handleAddPerson
      },
      {
        title: "Delete event",
        icon: style => <Icon {...style} name="trash" />,
        onPress: this.handleDeletePress
      }
    ];
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
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.titleContainer}
              onPress={() =>
                this.setState({ isEditingTitle: true, title: event.title })
              }
            >
              <Text style={styles.title}>{title}</Text>
              <Icon
                name="edit-outline"
                width={24}
                height={24}
                fill={colors.brandColor}
              />
            </TouchableOpacity>
            <OverflowMenu
              data={moreActionsData}
              visible={showMoreActions}
              selectedIndex={null}
              onSelect={index => moreActionsData[index].onPress()}
              onBackdropPress={() => this.setState({ showMoreActions: false })}
            >
              <Icon
                name="more-vertical"
                width={24}
                height={24}
                fill={colors.brandColor}
                onPress={() => this.setState({ showMoreActions: true })}
              />
            </OverflowMenu>
          </View>
        )}

        {errorMessage && (
          <Text style={styles.errorMessage} status="danger">
            {errorMessage}
          </Text>
        )}

        <Form style={styles.messageForm}>
          <View style={styles.messageListContainer}>
            {!messagesAreLoaded ? <Spinner /> : this.renderMessageList()}
          </View>
          {this.renderMessageInputRow()}
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
  topRow: {
    flexDirection: "row",
    marginHorizontal: gutterWidth,
    marginVertical: 10,
    justifyContent: "space-between"
  },

  titleContainer: {
    flexDirection: "row"
  },
  title: { fontSize: 18, marginRight: 20 },
  // header: { marginTop: 20, marginBottom: 10, fontWeight: "normal" },
  introText: { marginBottom: 10 },

  messageForm: { flex: 1, paddingHorizontal: 0 },
  messageListContainer: { flex: 1 },
  message: { paddingHorizontal: gutterWidth, paddingVertical: 10 },
  messageText: {},
  messageAuthor: { color: "#aaa", fontSize: 13, fontWeight: "bold" },
  messageTime: { color: "#aaa", fontSize: 13 },
  messageInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: colors.brandColor,
    borderTopWidth: 1
    // backgroundColor: "white"
  },
  messageInput: {
    borderWidth: 0,
    flex: 2,
    height: 50,
    // backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 2,
    color: "white", // todo: detect theme
    fontSize: 16
  },
  messageSubmitContainer: { paddingHorizontal: 10 }, //TouchableOpacity
  messageSubmitButton: {
    justifyContent: "center",
    alignItems: "center"
  },
  messageSubmitButtonIcon: {},
  deleteButton: { marginTop: 20 },
  errorMessage: {
    marginHorizontal: gutterWidth,
    marginVertical: gutterWidth,
    textAlign: "center"
  }
});

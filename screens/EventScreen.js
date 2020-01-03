import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Icon,
  Layout,
  Text,
  Spinner,
  Input
  // OverflowMenu,
} from "@ui-kitten/components";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import moment from "moment";
import { cloneDeep, sortBy, uniqBy } from "lodash";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import Button from "../components/Button";
import InlineForm from "../components/InlineForm";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import InlineFormInput from "../components/InlineFormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import InlineFormCancelButton from "../components/InlineFormCancelButton";
import InlineFormSubmitButton from "../components/InlineFormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import MessageComposer from "../components/MessageComposer";
import { NetworkContext } from "../components/NetworkProvider";
import { setSettings as setSettingsType } from "../redux/actions";
import {
  getEventByIdWithMessages,
  updateEvent,
  deleteEvent,
  createMessage,
  subscribeToServerUpdate
} from "../utils/api";
import { gutterWidth, colors, topNavigationHeight } from "../utils/style";
import {
  formatPhone,
  getFormattedNameFromContact,
  getFormattedNameFromUser,
  getFormattedMessageTime
} from "../utils/etc";
import { cachedRefresh } from "../utils/caching";

class EventScreen extends React.Component {
  static contextType = NetworkContext;
  static navigationOptions = props => {
    if (props.navigation.getParam("isNewEvent"))
      return {
        header: (
          <TopNavigation
            {...props}
            onBackPress={() => props.navigation.navigate("Home")}
          />
        )
      };
  };

  constructor(props) {
    super(props);
    // console.log("constructor", props.isNewEvent);
    const event = props.navigation.getParam("event");
    this.messageInputRef = React.createRef();
    this.titleInputRef = React.createRef();
    this.state = {
      title: event.title,
      serverMessagesKey: `eventScreenServerMessages-${event.id}`,
      localMessagesKey: `eventScreenLocalMessages-${event.id}`,
      error: null
    };
  }

  componentDidMount = async () => {
    this.screenFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      this.loadEventWithMessages
    );
    if (this.props.navigation.getParam("isNewEvent"))
      this.messageInputRef.current.focus();

    this.subscribeToServer();
  };

  componentWillUnmount = async () => {
    this.screenFocusSubscription.remove();
    if (this.eventSubscription) this.eventSubscription.unsubscribe();
  };

  subscribeToServer = () => {
    if (!this.context.isConnected) return;
    const event = this.props.navigation.getParam("event");
    this.eventSubscription = subscribeToServerUpdate({
      type: "Event",
      id: event.id,
      callback: ({ data, error }) => {
        if (error) this.setState({ error });
        this.loadEventWithMessages();
      }
    });
  };

  fetchMessagesForEventId = async eventId => {
    const { event, error } = await getEventByIdWithMessages(eventId);
    if (error) return { error };
    const messages = cloneDeep(event.messages.items);
    return { event, messages };
  };

  loadEventWithMessages = async () => {
    const { settings = {}, setSettings } = this.props;
    const { serverMessagesKey } = this.state;
    const event = this.props.navigation.getParam("event");

    if (this.context.isConnected) {
      const { messages, error } = await this.fetchMessagesForEventId(event.id);
      if (messages) setSettings({ [serverMessagesKey]: messages });
      // console.log(messages);
      if (error) this.setState({ error });
    }
  };

  handleSubmitTitle = async () => {
    const { title } = this.state;
    const event = this.props.navigation.getParam("event");
    this.setState({ isSubmittingTitle: true });
    const { event: updatedEvent, error } = await updateEvent({
      id: event.id,
      title
    });
    if (error) {
      this.setState({
        error,
        isSubmittingTitle: false
      });
      return;
    }
    this.setState({ isSubmittingTitle: false, isEditingTitle: false });
  };

  handleDelete = async () => {
    const event = this.props.navigation.getParam("event");
    this.setState({ isLoading: true });

    const { error } = await deleteEvent({ eventId: event.id });
    if (error) {
      this.setState({ error });
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

  renderMessage = ({ item: message }) => {
    const { user } = this.props.settings;
    const isByMe = !message.user || message.user.id === user.id;
    const userId = message.userId || message.user.id;
    return (
      <View style={styles.message}>
        <Text style={styles.messageText}>{message.text}</Text>
        {message.id ? (
          <Text style={styles.messageTime}>
            {getFormattedMessageTime(message.createdAt || message.localSentAt)}{" "}
            by{" "}
            <Text style={styles.messageAuthor}>
              {userId === user.id
                ? "you"
                : getFormattedNameFromUser(message.user)}
            </Text>
          </Text>
        ) : (
          <Text style={styles.messageTime}>Sending...</Text>
        )}
        {message.error && <Text status="danger">{message.error}</Text>}
      </View>
    );
  };

  renderMessageList = () => {
    const { event, localMessagesKey, serverMessagesKey } = this.state;
    const {
      [localMessagesKey]: localMessages,
      [serverMessagesKey]: serverMessages
    } = this.props.settings;
    if (!serverMessages) return <Spinner />;
    console.log("localMessages", localMessages);
    console.log("serverMessages", serverMessages);
    // const messages = [].concat(serverMessages);
    const messages = uniqBy(
      (localMessages || []).concat(serverMessages),
      "localSentAt"
    );
    // console.log(messages);
    const sortedMessages = sortBy(
      messages,
      m => m.localSentAt || m.createdAt
    ).reverse();
    // console.log("localMessages", localMessages);
    return (
      <FlatList
        inverted
        style={styles.messageList}
        renderItem={this.renderMessage}
        data={sortedMessages}
        keyExtractor={message => message.localSentAt.toString()}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
      />
    );
  };

  addMessageToQueue = async localMessage => {
    const { localMessagesKey } = this.state;
    const { [localMessagesKey]: localMessages } = this.props.settings;
    const { setSettings } = this.props;
    console.log("addMessageToQueue", localMessage);
    // await setSettings({ [localMessagesKey]: [localMessage].concat(localMessages) });
    await setSettings({
      [localMessagesKey]: [localMessage].concat(localMessages || [])
    });
  };
  sendMessageInQueue = async localSentAt => {
    const { localMessagesKey } = this.state;
    const { [localMessagesKey]: messages } = this.props.settings;
    this.setState({ isSubittingMessage: true });
    const localMessage = messages.find(m => m.localSentAt === localSentAt);
    if (!localMessage)
      return console.log(
        `sendMessageInQueue: can't find localSentAt ${localSentAt} in messages`
      );
    if (localMessage.id)
      return console.log(`Message ${localSentAt} is already sent!`);

    const { error, message } = await createMessage(localMessage);

    this.updateMessageInQueue({ localSentAt, message, error });
    this.setState({
      isSubittingMessage: false
    });
  };
  updateMessageInQueue = ({ localSentAt, message, error }) => {
    /*
    This function expects either 'message' or 'error'.
    Message is the returned object from server after creation.
    */
    const { localMessagesKey } = this.state;
    const { [localMessagesKey]: messages } = this.props.settings;
    const localMessage = messages.find(m => m.localSentAt === localSentAt);
    if (!localMessage)
      return console.log(
        `updateMessageInQueue: can't find localSentAt ${localSentAt} in messages`
      );
    if (message) {
      localMessage.wasDelivered = true;
      localMessage.id = message.id;
    } else {
      localMessage.error = error;
    }
  };

  handleMessageSubmit = async () => {
    const { inputText = "" } = this.state;
    const { user } = this.props.settings;
    const event = this.props.navigation.getParam("event");

    if (!inputText.length) return;
    // localSentAt is just a unique key that allows local messages to be identifed when they round trip from server

    const localSentAt = new Date().getTime();
    await this.addMessageToQueue({
      localSentAt,
      text: inputText,
      eventId: event.id,
      userId: user.id,
      cognitoUserId: user.cognitoUserId
    });
    this.setState({ inputText: "" });
    await this.sendMessageInQueue(localSentAt);
  };

  handleAddPerson = () => {
    const { user } = this.props.settings;
    const event = this.props.navigation.getParam("event");
    // this.setState({ showMoreActions: false });
    this.props.navigation.navigate("EditEventPhones", { event, user });
  };

  handleChangeInputText = inputText => {
    // if (this.state.inputText ==="")
    this.setState({ inputText });
  };

  handlePressTitle = async () => {
    const event = this.props.navigation.getParam("event");
    await this.setState({ isEditingTitle: true, title: event.title });
    this.titleInputRef.current.focus();
  };

  render() {
    const {
      error,
      title,
      isRefreshing,
      isLoading,
      isEditingTitle,
      isSubmittingTitle,
      messagesAreLoaded,
      showMoreActions,
      inputText
    } = this.state;

    const moreActionsData = [
      {
        title: "Add or remove people",
        icon: style => <Icon {...style} name="person-add" />,
        onPress: this.handleAddPerson
      }
      // {
      //   title: "Delete event",
      //   icon: style => <Icon {...style} name="trash" />,
      //   onPress: this.handleDeletePress
      // }
    ];
    const event = this.props.navigation.getParam("event");
    const { user } = this.props.settings;

    return (
      <Layout style={styles.container}>
        {isEditingTitle ? (
          <InlineForm>
            <InlineFormInput
              label=""
              placeholder="A name for the event"
              onChangeText={title => this.setState({ title, error: false })}
              value={title}
              maxLength={50}
              returnKeyType="done"
              selectTextOnFocus={true}
              onSubmitEditing={this.handleSubmitTitle}
              ref={this.titleInputRef}
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
              onPress={this.handlePressTitle}
            >
              <Text style={styles.title}>{title}</Text>
              <Icon
                name="edit-outline"
                width={24}
                height={24}
                fill={colors.brandColor}
              />
            </TouchableOpacity>
            {/*<OverflowMenu
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
            </OverflowMenu>*/}
          </View>
        )}

        <View style={styles.peopleButtonRow}>
          <Text>We have {event.eventPhones.items.length} people. </Text>
          <Button
            appearance="ghost"
            inline={true}
            onPress={() =>
              this.props.navigation.navigate("EditEventPhones", { event })
            }
            // icon={style => <Icon {...style} name="people" />}
          >
            Add or remove people
          </Button>
        </View>
        {error && (
          <Text style={styles.error} status="danger">
            {error}
          </Text>
        )}

        <Form style={styles.messageForm}>
          <View style={styles.messageListContainer}>
            {this.renderMessageList()}
          </View>

          <MessageComposer
            networkIsOffline={!this.context.isConnected}
            inputText={inputText}
            navigation={this.props.navigation}
            handleMessageSubmit={this.handleMessageSubmit}
            handleChangeInputText={this.handleChangeInputText}
            ref={this.messageInputRef}
          />
        </Form>
      </Layout>
    );
  }
}

export default connect(({ settings }) => ({ settings }), {
  setSettings: setSettingsType
})(EventScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: { marginHorizontal: gutterWidth },
  topRow: {
    flexDirection: "row",
    marginHorizontal: gutterWidth,
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  peopleButtonRow: {
    flexDirection: "row",
    marginHorizontal: gutterWidth,
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center"
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
  deleteButton: { marginTop: 20 },
  error: {
    marginHorizontal: gutterWidth,
    marginVertical: gutterWidth,
    textAlign: "center"
  }
});

import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  SectionList,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Icon, Layout, Text, Spinner } from "@ui-kitten/components";
import { groupBy, uniqBy, sortBy } from "lodash";
import moment from "moment";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { Linking } from "expo";
import Button from "../components/Button";
import {
  getCurrentUser,
  getEventPhonesByPhone,
  subscribeToServerUpdate,
  getEventsForKids
} from "../utils/api";
import {
  formatPhone,
  getFormattedNameFromEventPhone,
  getFormattedNameFromUser,
  getFormattedMessageTime,
  truncate
} from "../utils/etc";
import { gutterWidth, colors, textLinkColor } from "../utils/style";
import EventsEmptyState from "../components/EventsEmptyState";
import AddEventActions from "../components/AddEventActions";
import { setSettings as setSettingsType } from "../redux/actions";
import { NetworkContext } from "../components/NetworkProvider";

class HomeScreen extends React.Component {
  static contextType = NetworkContext;
  state = {};
  componentDidMount = async () => {
    this.screenFocusSubcription = this.props.navigation.addListener(
      "willFocus",
      this.loadUserData
    );
  };

  componentWillUnmount() {
    this.screenFocusSubcription.remove();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  subscribeToServer = () => {
    const { settings = {}, setSettings } = this.props;
    const { user } = settings;
    if (!this.context.isConnected) return;
    if (this.userSubscription) return; //already subscribed
    if (!user) return;
    this.userSubscription = subscribeToServerUpdate({
      type: "User",
      id: user.id,
      callback: ({ data, error }) => {
        if (!error) this.loadUserData();
      }
    });
  };

  fetchUserData = async () => {
    const {
      user,
      cognitoUser,
      error: currentUserError
    } = await getCurrentUser();
    if (currentUserError) return { error: currentUserError };
    const {
      eventPhones,
      error: eventPhonesError
    } = await getEventPhonesByPhone(user.phone);
    if (eventPhonesError) return { error: eventPhonesError };
    let events = eventPhones.map(ep => ep.event);

    if (user.isParent) {
      // Add our kids' "both" events to the list
      const {
        events: eventsForKids,
        error: eventsForKidsError
      } = await getEventsForKids({ user });
      if (eventsForKidsError) return { error: eventsForKidsError };
      if (eventsForKids.length) {
        // Can be a duplicate if a parent starts a 'both' event with their kid
        events = uniqBy(events.concat(...eventsForKids), "id");
      }
    } else {
      // Hide parents-only events from kids
      events = events.filter(ev => ev.type !== "parents");
    }

    return { user, events: sortBy(events, "updatedAt").reverse() };
  };

  loadUserData = async () => {
    const { settings = {}, setSettings } = this.props;
    this.setState({ error: null });
    if (!this.context.isConnected) return;

    const { user, events, error } = await this.fetchUserData();

    if (error)
      this.setState({
        error: `${error}. To refresh you can "pull" down on this screen.`
      });
    if (user) await setSettings({ user, events });
    this.subscribeToServer(); //will subscribe to graphql if not already subscribed. requires user to be loaded
  };

  handlePullToRefresh = async () => {
    this.setState({ isRefreshing: true });
    await this.loadUserData();
    this.setState({ isRefreshing: false });
  };

  handleAddEvent = ({ type }) => {
    const { user } = this.props.settings;
    this.props.navigation.navigate("EditEventPhones", {
      type
    });
  };

  renderEvent = ({ item: event, index }) => {
    let { title, createdAt, latestMessage } = event;
    const { user } = this.props.settings;

    const onPress = () =>
      this.props.navigation.navigate("Event", {
        event,
        user: user
      });
    const eventPhonesExceptMe = event.eventPhones.items.filter(
      ep => ep.phone !== user.phone
    );
    const eventPhonesText =
      eventPhonesExceptMe
        .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
        .join(", ") || "";

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.listItem}>
          <View style={styles.listItemCol1}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.eventInnerRow}>
              <Text style={styles.creationTimeLabel}>Includes </Text>
              <Text style={{}}>{eventPhonesText}</Text>
            </Text>
            <Text style={styles.eventInnerRow}>
              <Text style={styles.creationTimeLabel}>Started by </Text>
              {event.user.id === user.id
                ? "you"
                : getFormattedNameFromUser(event.user)}
            </Text>
            {latestMessage && (
              <View>
                <Text style={styles.eventInnerRow}>
                  <Text style={styles.creationTimeLabel}>
                    {getFormattedMessageTime(latestMessage.createdAt)}
                    {" by "}
                  </Text>
                  {latestMessage.user.phone === user.phone
                    ? "you"
                    : truncate(
                        getFormattedNameFromUser(latestMessage.user),
                        15
                      )}
                  {": "}
                </Text>
                <Text style={styles.latestMessageText}>
                  {truncate(latestMessage.text, 40)}
                </Text>
              </View>
            )}
          </View>

          <Icon
            name="chevron-right"
            width={32}
            height={32}
            fill={colors.brandColor}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    const { user, events } = this.props.settings;
    return (
      <View>
        <AddEventActions
          user={user}
          handleAddEvent={this.handleAddEvent}
          appearance="outline"
        />
        <View style={styles.eventsSection}>
          <Text style={styles.sectionHeaderText}>
            Threads that include you:
          </Text>
        </View>
      </View>
    );
  };
  renderEventsList = () => {
    const { isRefreshing } = this.state;
    const { user, events } = this.props.settings;
    if (!events.length) return null;
    return (
      <FlatList
        style={styles.list}
        renderItem={this.renderEvent}
        data={events}
        keyExtractor={event => event.id}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this.handlePullToRefresh}
          />
        }
        ListHeaderComponent={this.renderHeader}
      />
    );
  };
  renderLoading() {
    return (
      <Layout style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>Loading Village Keep...</Text>
          <Spinner />
        </View>
      </Layout>
    );
  }
  render() {
    const { error } = this.state;
    const { user, events } = this.props.settings;
    const showSteps = true;

    return (
      <Layout style={styles.container}>
        {error && (
          <Text status="danger" style={styles.error}>
            {error}
          </Text>
        )}
        {!user || !events
          ? this.renderLoading()
          : this.renderEventsList() || (
              <>
                <Text style={styles.header}>Welcome to Village Keep</Text>
                <EventsEmptyState
                  user={user}
                  handleAddEvent={this.handleAddEvent}
                  navigation={this.props.navigation}
                />
              </>
            )}
      </Layout>
    );
  }
}
export default connect(({ settings }) => ({ settings }), {
  setSettings: setSettingsType
})(HomeScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: gutterWidth,
    flex: 1
  },
  header: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "normal",
    textTransform: "uppercase",
    textAlign: "center",
    color: colors.brandColor
  },
  eventsSection: {
    marginTop: 20
  },
  sectionHeaderText: {
    fontSize: 16,
    color: colors.brandColor,
    textTransform: "uppercase",
    marginBottom: 10
  },
  error: {
    marginVertical: 24
  },
  eventsContainer: { paddingVertical: 0 },
  list: {
    marginVertical: 16
  },
  listItemCol1: {
    width: "85%"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listItemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.brandColor,
    marginVertical: 12
  },
  eventTopRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "normal",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold"
  },
  eventInnerRow: {
    marginVertical: 2
  },
  eventPhonesText: {
    fontSize: 16,
    color: colors.brandColor,
    marginVertical: 5
  },
  creationTimeLabel: { color: "#aaa" },
  latestMessageText: { fontStyle: "italic", marginVertical: 5 },
  eventsHeader: {},
  eventName: { fontWeight: "bold" },
  eventPhone: { color: textLinkColor, marginVertical: 5 }
});

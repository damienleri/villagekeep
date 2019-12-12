import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  SectionList,
  TouchableOpacity
} from "react-native";
import {
  Icon,
  Layout,
  Text,
  Radio,
  Card,
  CardHeader,
  Spinner
} from "@ui-kitten/components";
import { groupBy } from "lodash";
import moment from "moment";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { Linking } from "expo";
import Button from "../components/Button";
import { getCurrentUser, getEventPhonesByPhone } from "../utils/api";
import {
  formatPhone,
  getFormattedNameFromEventPhone,
  getFormattedNameFromUser,
  getFormattedMessageTime
} from "../utils/etc";
import { cachedRefresh } from "../utils/caching";
import { gutterWidth, colors, textLinkColor } from "../utils/style";
import EventsEmptyState from "../components/EventsEmptyState";
import AddEventActions from "../components/AddEventActions";
import { setSettings } from "../redux/actions";
import { NetworkContext } from "../components/NetworkProvider";

class HomeScreen extends React.Component {
  static contextType = NetworkContext;
  state = {};
  componentDidMount = async () => {
    /* call loadUserData() whenever this screen is displayed, in case data has changed */
    this.loadUserDataSubcription = this.props.navigation.addListener(
      "willFocus",
      this.loadUserData
    );
  };
  componentWillUnmount() {
    this.loadUserDataSubcription.remove();
  }

  fetchUserData = async () => {
    const { user, error: currentUserError } = await getCurrentUser();
    if (currentUserError) return { error: currentUserError };
    const {
      eventPhones,
      error: eventPhonesError
    } = await getEventPhonesByPhone(user.phone);
    if (eventPhonesError) return { error: eventPhoneError };
    const events = eventPhones.map(ep => ep.event).filter(event => !!event);
    return { user, events };
  };

  loadUserData = async () => {
    const { settings = {}, setSettings } = this.props;

    if (this.context.isConnected) {
      const { user, events, error } = await this.fetchUserData();
      if (user) setSettings({ user, events });
      if (error) this.setState({ error });
    }
  };
  // const { error } = await cachedRefresh({
  //   cachedData: settings.homeScreenUser &&
  //     settings.homeScreenEvents && {
  //       user: settings.homeScreenUser,
  //       events: settings.homeScreenEvents
  //     },
  //   getData: async () => {
  //     const { user, events, error } = await this.fetchUserData();
  //     return { data: { user, events }, error };
  //   },
  //   onHaveData: ({ user, events }) => {
  //     this.setState({ user, events, userLoaded: true });
  //   },
  //   updateCache: ({ user, events }) =>
  //     setSettings({ homeScreenUser: user, homeScreenEvents: events }),
  //   networkIsOffline: !this.context.isConnected
  // });
  //
  // if (error)
  //   return this.setState({
  //     generalErrorMessage: error
  //   });

  handleRefresh = async () => {
    // pull to refresh
    this.setState({ isRefreshing: true });
    await this.loadUserData();
    this.setState({ isRefreshing: false });
  };

  handleAddEvent = ({}) => {
    const { user } = this.props.settings;
    this.props.navigation.navigate("EditEventPhones", {
      user
    });
  };

  // handlePhonePress = ({ phone }) => {
  //   Linking.openURL(`tel:${phone}`);
  // };

  // renderHeader = () => {
  //   // https://github.com/vikrantnegi/react-native-searchable-flatlist/blob/master/src/SearchableList.js
  //   return (
  //     <SearchBar
  //       placeholder="Type Here..."
  //       lightTheme
  //       round
  //       onChangeText={text => this.searchFilterFunction(text)}
  //       autoCorrect={false}
  //       value={this.state.value}
  //     />
  //   );
  // };

  renderEvent = ({ item: event, index }) => {
    let { title, createdAt, latestMessage } = event;
    const { user } = this.props.settings;

    const onPress = () =>
      this.props.navigation.navigate("Event", {
        event,
        user: user
      });
    // console.log(event);
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
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.eventPhonesText}>{eventPhonesText}</Text>
            {latestMessage && (
              <View>
                <Text style={styles.creationTimeLabel}>
                  {getFormattedMessageTime(latestMessage.createdAt)}
                  {" by "}
                  {latestMessage.user.phone === user.phone
                    ? "you"
                    : getFormattedNameFromUser(latestMessage.user)}
                  {": "}
                </Text>
                <Text style={styles.latestMessageText}>
                  {latestMessage.text}
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

  renderEventsList = () => {
    const { user, events } = this.props.settings;
    const { isParent } = user;

    if (!events.length) return null;

    return (
      <View>
        <AddEventActions
          user={user}
          handleAddEvent={this.handleAddEvent}
          appearance="outline"
        />

        <FlatList
          style={styles.list}
          renderItem={this.renderEvent}
          data={events}
          keyExtractor={event => event.id}
          ItemSeparatorComponent={() => (
            <View style={styles.listItemSeparator} />
          )}
        />
      </View>
    );
  };
  render() {
    const { error, isRefreshing } = this.state;
    const { user, events } = this.props.settings;
    const showSteps = true;

    return (
      <Layout style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          {error && (
            <Text status="danger" style={styles.error}>
              {error}
            </Text>
          )}

          <Text style={styles.header}>Village Keep</Text>

          <View style={styles.eventsContainer}>
            {!user ? (
              <Spinner />
            ) : (
              this.renderEventsList() || (
                <EventsEmptyState
                  user={user}
                  handleAddEvent={this.handleAddEvent}
                  navigation={this.props.navigation}
                />
              )
            )}
          </View>
        </ScrollView>
      </Layout>
    );
  }
}
export default connect(
  ({ settings }) => ({ settings }),
  { setSettings }
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: gutterWidth
  },
  header: {
    paddingVertical: 18,
    fontSize: 28,
    fontWeight: "normal",
    textTransform: "uppercase",
    textAlign: "center",
    color: colors.brandColor
  },
  error: {
    marginVertical: 24
  },
  eventsContainer: { paddingVertical: 0 },
  list: {
    marginVertical: 16
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listItemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.brandColor,
    marginVertical: 8
  },
  eventTopRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "normal",
    fontSize: 16,
    color: colors.brandColor,
    fontWeight: "bold"
  },
  // creationTimeContainer: { justifyContent: "flex-end" },
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

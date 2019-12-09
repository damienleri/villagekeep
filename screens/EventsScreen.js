import React from "react";
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
// import { Appearance } from "react-native-appearance";
// const colorScheme = Appearance.getColorScheme();
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
import { gutterWidth, colors, textLinkColor } from "../utils/style";
import EventsEmptyState from "../components/EventsEmptyState";
import AddEventActions from "../components/AddEventActions";

export default class PeopleScreen extends React.Component {
  state = {};
  componentDidMount = async () => {
    /* call loadUserData() whenever this screen is displayed, in case data has changed */
    this.loadUserDataSubcription = this.props.navigation.addListener(
      "didFocus",
      async () => {
        await this.loadUserData();
      }
    );
  };
  componentWillUnmount() {
    this.loadUserDataSubcription.remove();
  }
  loadUserData = async () => {
    const { user, error: currentUserError } = await getCurrentUser();
    if (currentUserError) {
      this.setState({
        generalErrorMessage: currentUserError
      });
      return;
    }
    const {
      eventPhones,
      error: eventPhonesError
    } = await getEventPhonesByPhone(user.phone);
    if (eventPhonesError) {
      this.setState({
        generalErrorMessage: eventPhonesError
      });
      return;
    }

    const events = eventPhones.map(ep => ep.event).filter(event => !!event);
    // console.log("events", events);
    this.setState({ user, events, userLoaded: true });
  };
  handleRefresh = async () => {
    // pull to refresh
    this.setState({ isRefreshing: true });
    await this.loadUserData();
    this.setState({ isRefreshing: false });
  };
  handleAddEvent = ({}) => {
    this.props.navigation.navigate("EditEventPhones", {
      user: this.state.user
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
    const { user } = this.state;

    const onPress = () =>
      this.props.navigation.navigate("Event", {
        event,
        user: this.state.user
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
          <View style={{ justifyContent: "center" }}>
            <Icon
              name="chevron-right"
              width={32}
              height={32}
              fill={colors.brandColor}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderEventsList = () => {
    const { user, events } = this.state;
    const { isParent } = user;

    if (!events.length) return null;

    return (
      <View>
        <AddEventActions
          user={user}
          handleAddEvent={this.handleAddEvent}
          appearance="ghost"
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
    const { generalErrorMessage, user, userLoaded, isRefreshing } = this.state;
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
          {generalErrorMessage && (
            <Text status="danger" style={styles.generalErrorMessage}>
              {generalErrorMessage}
            </Text>
          )}

          <Text category="h2" style={styles.header}>
            Village Keep
          </Text>

          <View style={styles.eventsContainer}>
            {!userLoaded ? (
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: gutterWidth
  },
  header: {
    marginBottom: 10,
    fontWeight: "normal",
    textTransform: "uppercase",
    textAlign: "center",
    color: colors.brandColor
  },
  generalErrorMessage: {
    marginVertical: 20
  },
  eventsContainer: { paddingVertical: 0 },
  eventsSection: {
    marginVertical: 10
  },
  list: {
    marginVertical: 20
  },
  listItem: { flexDirection: "row", justifyContent: "space-between" },
  listItemSeparator: {
    height: 1,
    backgroundColor: colors.brandColor,
    marginVertical: 10
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

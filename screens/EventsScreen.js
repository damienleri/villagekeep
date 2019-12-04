import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
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
import { getCurrentUser, createEvent } from "../utils/api";
import { formatPhone, getFormattedNameFromContact } from "../utils/etc";
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
    if (currentUserError)
      return this.setState({
        generalErrorMessage: `Error: ${currentUserError}`
      });
    console.log("currentuser", user);
    // const events = user.events.items;
    // console.log("events", events);
    this.setState({ user, userLoaded: true });
  };
  handleRefresh = async () => {
    this.setState({ isRefreshing: true });
    await this.loadUserData();
    this.setState({ isRefreshing: false });
  };
  handleAddEvent = ({}) => {
    this.props.navigation.navigate("EditEventContacts", {
      user: this.state.user
    });
  };
  // handleEditEvent = ({ event }) => {
  //   this.props.navigation.navigate("EditEvent", {
  //     event,
  //     user: this.state.user
  //   });
  // };
  // handleEditEventContacts = ({ event }) => {};

  handlePhonePress = ({ phone }) => {
    Linking.openURL(`tel:${phone}`);
  };
  renderEvent = (event, index) => {
    let { title, createdAt } = event;

    const description = `Created ${moment(createdAt).fromNow()}`;
    return (
      <Card header={<CardHeader title={title} description={description} />}>
        <Text>
          {event.attendees.items.map(getFormattedNameFromContact).join(", ")}
        </Text>
      </Card>
    );
    return (
      <View key={index} style={styles.event}>
        <Text
          style={styles.eventTitle}
          onPress={() =>
            this.props.navigation.navigate("Event", {
              event,
              user: this.state.user
            })
          }
        >
          {title}
        </Text>
      </View>
    );
  };
  renderEventsList = () => {
    const { user } = this.state;
    const { isParent } = user;
    const events = user.events ? user.events.items : [];
    if (!events.length) return null;

    return (
      <View>
        <AddEventActions
          user={user}
          handleAddEvent={this.handleAddEvent}
          appearance="ghost"
        />

        <View style={styles.eventsSection}>
          <Text style={styles.eventsHeader} appearance="hint" category="h6">
            Events
          </Text>
          {events.map(this.renderEvent)}
        </View>
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
  event: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    marginVertical: 10
  },
  eventsHeader: {},
  eventName: { fontWeight: "bold" },
  eventPhone: { color: textLinkColor, marginVertical: 5 }
});

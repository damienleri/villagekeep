import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
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
import { groupBy } from "lodash";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { Linking } from "expo";
import { getCurrentUser, createEvent } from "../utils/api";
import { formatPhone } from "../utils/etc";
import { gutterWidth, primaryColor, textLinkColor } from "../utils/style";
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
  handleAddEvent = ({ type }) => {
    this.props.navigation.navigate("EditEvent", {
      // type,
      user: this.state.user
    });
  };
  handleEditEvent = ({ event }) => {
    this.props.navigation.navigate("EditEvent", {
      event,
      user: this.state.user
    });
  };

  handlePhonePress = ({ phone }) => {
    Linking.openURL(`tel:${phone}`);
  };
  renderEvent = (event, index) => {
    let { title } = event;
    return (
      <View key={index} style={styles.event}>
        <Text style={styles.eventTitle}>{title}</Text>

        <Button
          appearance="ghost"
          onPress={() => this.handleEditEvent({ event, user: this.state.user })}
        >
          Edit
        </Button>
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
    color: primaryColor
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

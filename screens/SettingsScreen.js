import React from "react";
import { connect } from "react-redux";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import {} from "react-navigation";
import {
  Layout,
  List,
  ListItem,
  Card,
  Text,
  Toggle
} from "@ui-kitten/components";
import { Auth } from "aws-amplify";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import { gutterWidth } from "../utils/style";
import Button from "../components/Button";
import BuildInfo from "../components/BuildInfo";
import { NetworkContext } from "../components/NetworkProvider";
import { setSettings as setSettingsType } from "../redux/actions";
import { getCurrentUser, updateUser } from "../utils/api";
import { cachedRefresh } from "../utils/caching";

class SettingsScreen extends React.Component {
  static contextType = NetworkContext;
  state = {};
  handleLogout = async () => {
    try {
      await Auth.signOut();
      this.props.navigation.navigate("AuthHome");
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.loadUserDataSubcription = this.props.navigation.addListener(
      "willFocus",
      this.loadUserData
    );
  }
  componentWillUnmount() {
    this.loadUserDataSubcription.remove();
  }

  loadUserData = async () => {
    const { settings = {}, setSettings } = this.props;

    if (this.context.isConnected) {
      const { user, error } = await getCurrentUser();
      if (user) setSettings({ user });
      if (error) this.setState({ error });
    }
  };
  // loadUserData = async () => {
  //   const { settings = {}, setSettings } = this.props;
  //   const { error } = await cachedRefresh({
  //     cachedData: settings.homeScreenUser && {
  //       user: settings.homeScreenUser
  //     },
  //     getData: async () => {
  //       const { user, error } = await getCurrentUser();
  //       return { data: { user }, error };
  //     },
  //     onHaveData: ({ user }) => {
  //       this.setState({ user });
  //     },
  //     updateCache: ({ user }) => setSettings({ homeScreenUser: user }),
  //     networkIsOffline: !this.context.isConnected
  //   });
  // };

  registerForPushNotifications = async () => {
    const { settings, setSettings } = this.props;
    const { theme, user = {} } = settings;

    let pushToken;

    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      pushToken = await Notifications.getExpoPushTokenAsync();
    } else {
      // in simulator
      console.log("Must use physical device for Push Notifications");
      pushToken = "9999";
    }

    if (!pushToken) {
      this.setState({
        error:
          "Please enable notifications for this app in your phone's Settings."
      });
      return;
    }

    const { error } = await this.updateElseRevertUser({
      user,
      updates: { pushEnabled: true, pushToken }
    });
    if (error) this.setState({ error });
  };

  updateElseRevertUser = async ({ user: beforeUser, updates }) => {
    const { settings, setSettings } = this.props;
    await setSettings({ user: { ...beforeUser, ...updates } });
    let { error } = await updateUser({
      id: beforeUser.id,
      ...updates
    });
    if (error) {
      setSettings({ user: beforeUser }); // Revert the checkbox
      return { error };
    }
    const { user, error: getError } = await getCurrentUser();
    if (getError) return { error: getError };
    if (user) {
      setSettings({ user }); // refresh user cache
    }
    return { user };
  };

  handlePushEnabledChange = async isChecked => {
    const { settings, setSettings } = this.props;
    const { user = {} } = settings;
    if (isChecked) {
      await this.registerForPushNotifications();
    } else {
      const { error } = await this.updateElseRevertUser({
        user,
        updates: { pushEnabled: false }
      });
      if (error) this.setState({ error });
    }
  };

  render() {
    const { settings, setSettings } = this.props;
    const { theme, user = {} } = settings;
    console.log("and render", user.pushEnabled);
    const { error } = this.state;
    const isDeveloper = false; //!Device.isDevice; // in simulator
    return (
      <Layout style={styles.container}>
        <Text category="h4" style={styles.header}>
          Settings
        </Text>

        {error && <Text status="danger">{error}</Text>}

        <View style={[styles.row, styles.toggleRow]}>
          <Toggle
            text="Display dark mode"
            checked={theme === "dark"}
            onChange={isChecked => {
              setSettings({ theme: isChecked ? "dark" : "light" });
            }}
          />
        </View>
        <View style={[styles.row, styles.toggleRow]}>
          <Toggle
            text="Allow push notifications"
            checked={user.pushEnabled}
            onChange={this.handlePushEnabledChange}
          />
        </View>
        <View style={styles.row}>
          <Button
            appearance="outline"
            onPress={() => this.props.navigation.navigate("SettingsEditAccont")}
          >
            Edit account
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            appearance="outline"
            status="basic"
            onPress={this.handleLogout}
          >
            Log Out
          </Button>
        </View>

        {isDeveloper && (
          <View style={styles.row}>
            <Button
              appearance="outline"
              status="danger"
              onPress={() => this.props.navigation.navigate("TestApi")}
            >
              Test the API
            </Button>
          </View>
        )}
        <BuildInfo />
      </Layout>
    );
  }
}

export default connect(
  ({ settings }) => ({ settings }),
  { setSettings: setSettingsType }
)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: gutterWidth
  },
  header: { marginBottom: 20 },
  row: { marginVertical: 20 },
  toggleRow: { flexDirection: "row", justifyContent: "flex-start" },
  devItem: {}
});

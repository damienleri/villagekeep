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
  Toggle,
  Icon
} from "@ui-kitten/components";
import Auth from "@aws-amplify/auth";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import { gutterWidth } from "../utils/style";
import Button from "../components/Button";
import BuildInfo from "../components/BuildInfo";
import { NetworkContext } from "../components/NetworkProvider";
import { setSettings as setSettingsType } from "../redux/actions";
import { getCurrentUser, updateUser } from "../utils/api";

class SettingNotificationsForm extends React.Component {
  state = {};

  componentDidMount() {
    this.initFromPerms();
  }

  initFromPerms = async () => {
    const { settings, setSettings } = this.props;
    const { user = {} } = settings;
    if (!user.pushEnabled) return;
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (!Constants.isDevice || status === "granted") {
      this.setState({ pushEnabled: true });
    } else {
      setSettings({ pushEnabled: false });
    }
  };

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
        return { error: "Failed to get push token for push notification!" };
      }
      pushToken = await Notifications.getExpoPushTokenAsync();
    } else {
      // in simulator
      // return {error: "Must use physical device for Push Notifications"}
      pushToken = "9999";
    }

    if (!pushToken) {
      return {
        error:
          "Please enable notifications for this app in your phone's Settings."
      };
    }

    const { error } = await this.updateElseRevertUser({
      user,
      updates: { pushEnabled: true, pushToken }
    });
    if (error) return { error };
    return { pushToken };
  };

  updateElseRevertUser = async ({ user: beforeUser, updates }) => {
    const { settings, setSettings } = this.props;
    await setSettings({ user: { ...beforeUser, ...updates } });
    let { error } = await updateUser({
      id: beforeUser.id,
      ...updates
    });
    if (error) {
      // Revert the checkbox
      this.setState({ pushEnabled: false });
      setSettings({ user: beforeUser });
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
    this.setState({ pushEnabled: isChecked });
    if (isChecked) {
      const { error } = await this.registerForPushNotifications();
      if (error) this.setState({ error, pushEnabled: false });
    } else {
      // user wants to turn it off
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
    const { error, pushEnabled } = this.state;

    return (
      <View>
        <View style={styles.row}>
          <Toggle
            text="Allow push notifications"
            checked={pushEnabled}
            onChange={this.handlePushEnabledChange}
          />
        </View>
        {error && <Text status="danger">{error}</Text>}
      </View>
    );
  }
}

export default connect(({ settings }) => ({ settings }), {
  setSettings: setSettingsType
})(SettingNotificationsForm);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 20
  }
});

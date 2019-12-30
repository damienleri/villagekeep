import React from "react";
import { connect } from "react-redux";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
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
import { colors } from "../utils/style";

class SettingsScreen extends React.Component {
  static contextType = NetworkContext;
  state = {};
  handleLogout = async () => {
    const { settings, setSettings } = this.props;
    try {
      await Auth.signOut();
      setSettings({ user: null, events: null });
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
    this.setState({ error: null });
    const { settings = {}, setSettings } = this.props;

    if (this.context.isConnected) {
      const { user, error } = await getCurrentUser();
      if (user) setSettings({ user });
      if (error) this.setState({ error });
    }
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={item.onPress}>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemDescription}>{item.description}</Text>
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

  render() {
    const { settings, setSettings } = this.props;
    const { theme, user = {} } = settings;
    if (!user) return null;
    const { error } = this.state;
    const isDeveloper = !Constants.isDevice; // in simulator

    const items = [
      {
        title: "Notifications",
        description: user.pushEnabled
          ? "You have push notifications enabled"
          : "You do not have push notifications enabled",
        onPress: () => this.props.navigation.navigate("SettingNotifications")
      },
      {
        title: "Account",
        description: `${user.firstName} ${user.lastName} - ${
          user.isParent ? "parent or guardian" : "teen"
        }`,
        onPress: () => this.props.navigation.navigate("SettingAccount")
      }
    ];
    return (
      <Layout style={styles.container}>
        <Text style={styles.header}>Settings</Text>

        {error && <Text status="danger">{error}</Text>}
        <View style={styles.content}>
          <View style={styles.toggleRow}>
            <Text style={styles.title}>Display dark mode</Text>
            <Toggle
              checked={theme === "dark"}
              onChange={isChecked => {
                setSettings({ theme: isChecked ? "dark" : "light" });
              }}
            />
          </View>

          <FlatList
            renderItem={this.renderItem}
            data={items}
            keyExtractor={item => item.title}
            ItemSeparatorComponent={() => (
              <View style={styles.listItemSeparator} />
            )}
          />

          <View style={styles.buttonRow}>
            <Button
              appearance="ghost"
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
        </View>
        <BuildInfo />
      </Layout>
    );
  }
}

export default connect(({ settings }) => ({ settings }), {
  setSettings: setSettingsType
})(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    marginVertical: 24
  },
  listItem: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listItemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.brandColor,
    marginVertical: 10
  },
  listItemTitle: { color: colors.brandColor },
  listItemDescription: {},
  buttonRow: { marginVertical: 20 },
  toggleRow: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  devItem: {}
});

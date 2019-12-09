import React from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import {} from "react-navigation";
import { Layout, List, ListItem, Card, Text } from "@ui-kitten/components";
import * as Device from "expo-device";
import { Auth } from "aws-amplify";
import { gutterWidth } from "../utils/style";
import Button from "../components/Button";
import BuildInfo from "../components/BuildInfo";

export default class SettingsScreen extends React.Component {
  handleLogout = async () => {
    try {
      await Auth.signOut();
      this.props.navigation.navigate("AuthHome");
    } catch (e) {
      this.setState({ errorMessage: e });
    }
  };
  render() {
    const isDeveloper = !Device.isDevice; // in simulator
    return (
      <Layout style={styles.container}>
        <Text category="h4">Settings</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: gutterWidth
  },
  row: { marginVertical: 20 },
  devItem: {}
});

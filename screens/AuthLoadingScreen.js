import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Auth from "@aws-amplify/auth";
import * as Device from "expo-device";
import { deleteCurrentUser } from "../utils/api";
import { colors } from "../utils/style";

export default class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    await this.loadApp();
  };
  loadApp = async () => {
    console.log("\n****** Loading App *******\n");

    try {
      if (!Device.isDevice) {
        // for testing only
        await Auth.signIn("+12027621401", "testkid1!"); // kid test account
        // await Auth.signIn("+19142329901", "testparent1!"); // parent test account
        return this.props.navigation.navigate("Home");
      }

      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });

      this.props.navigation.navigate("Main");
    } catch (e) {
      this.props.navigation.navigate("Welcome");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brandColor,
    alignItems: "center",
    justifyContent: "center"
  }
});

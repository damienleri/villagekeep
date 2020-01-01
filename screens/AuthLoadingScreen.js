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
    console.log("\n******Auth loading*******\n");

    // return this.props.navigation.navigate("AuthForgotPassword");
    // return this.props.navigation.navigate("AuthForgotPasswordVerify", {
    //   phone: "+12678086023"
    // });
    try {
      if (!Device.isDevice) {
        // if (0 && !Device.isDevice) {

        // in simulator
        // for testing
        // await Auth.signIn("+16109104174", "testtest1");
        await Auth.signIn("+12678086023", "testtest1");
        console.log("Debugging: signed in");
        // return this.props.navigation.navigate("EditEvent");
        return this.props.navigation.navigate("Home");
        // this.props.navigation.navigate("EditContact", { type: "kid" });
      }

      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });

      // return this.props.navigation.navigate("People");

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

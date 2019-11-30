import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Auth } from "aws-amplify";
import { deleteCurrentUser } from "../utils/api";

export default class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    await this.loadApp();
  };
  loadApp = async () => {
    console.log("\n******Auth loading*******\n");

    try {
      if (true) {
        // for testing
        await Auth.signIn("+12678086023", "testtest1");
        console.log("Debugging: signed in");
        this.props.navigation.navigate("EditContact", { type: "kid" });
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
    backgroundColor: "#3366FF",
    alignItems: "center",
    justifyContent: "center"
  }
});

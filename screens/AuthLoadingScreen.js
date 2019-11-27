import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Auth } from "aws-amplify";

export default class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    await this.loadApp();
  };
  loadApp = async () => {
    console.log("\n******Auth loading*******\n");

    if (true) {
      await Auth.signIn("+12678086023", "testtest");
      console.log("Debugging: signed in");
      return this.props.navigation.navigate("TestApi");
    }
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      console.log("not logged in");
      this.props.navigation.navigate("Home");
    } catch (e) {
      console.log("Error from currentAuthenticatedUser", e);
      this.props.navigation.navigate("AuthSignUp");
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
    backgroundColor: "#aa73b7",
    alignItems: "center",
    justifyContent: "center"
  }
});

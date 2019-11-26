import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Amplify from "aws-amplify";
import {
  Authenticator,
  SignIn,
  SignUp,
  ForgotPassword,
  ConfirmSignUp
} from "aws-amplify-react-native";
// import settings from "../aws-exports";
// Amplify.configure(settings);
import { Hub, Logger } from "aws-amplify";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Sign In or Sign Up"
  };

  authStateChange(authState) {
    console.log(`authhomescreen: auth state change to ${authState}`);
  }

  componentDidMount() {
    // const alex = new Logger("AuthListener");
    Hub.listen("auth", capsule => {
      switch (capsule.payload.event) {
        case "signIn":
          console.log("user signed in");
          this.props.navigation.navigate("Main");
          break;
        case "signUp":
          console.log("user signed up");
          break;
        case "signOut":
          console.log("user signed out");
          this.props.navigation.navigate("Auth");
          break;
        case "signIn_failure":
          console.log("user sign in failed");
          break;
        case "configured":
          console.log("the Auth module is configured");
      }
    });

    // Hub.listen("auth", alex);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Authenticator
          hideDefault={true}
          onStateChange={authState => this.authStateChange(authState)}
        >
          <SignIn />
          <SignUp />
          <ForgotPassword />
          <ConfirmSignUp />
        </Authenticator>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

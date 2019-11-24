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
    console.log("auth state change");
    console.log(authState);
  }

  componentDidMount() {
    const alex = new Logger("AuthListener");

    alex.onHubCapsule = capsule => {
      switch (capsule.payload.event) {
        case "signIn":
          alex.error("user signed in");
          this.props.navigation.navigate("Main");
          break;
        case "signUp":
          alex.error("user signed up");
          break;
        case "signOut":
          alex.error("user signed out");
          this.props.navigation.navigate("Auth");
          break;
        case "signIn_failure":
          alex.error("user sign in failed");
          break;
        case "configured":
          alex.error("the Auth module is configured");
      }
    };

    Hub.listen("auth", alex);
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

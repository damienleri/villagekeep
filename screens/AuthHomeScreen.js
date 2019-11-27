import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Authenticator,
  SignIn,
  SignUp,
  ForgotPassword,
  ConfirmSignUp
} from "aws-amplify-react-native";
// import Amplify from "aws-amplify";
import amplifyConfig from "../aws-exports";
console.log("amplifyConfig", amplifyConfig);
// Amplify.configure(settings);
import { Auth, Hub, Logger } from "aws-amplify";

export default class AuthHomeScreen extends React.Component {
  static navigationOptions = {
    title: "Sign In or Sign Up"
  };

  authStateChange(authState) {
    console.log(`authhomescreen: auth state change to ${authState}`);
  }

  componentDidMount() {
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
  }

  //// AUthenticator docs: https://aws-amplify.github.io/docs/js/authentication
  // <ConfirmSignUp />
  render() {
    const signUpConfig = {
      // hiddenDefaults: ["p"],
      hiddenDefaults: ["phone_number", "email"],
      // hideAllDefaults: true,
      signUpFields: [
        {
          label: "You will login using this phone number",
          key: "username",
          required: true,
          placeholder: "Enter your phone",
          type: "phone_number",
          displayOrder: 1
        },
        {
          label: "Please create a password",
          key: "password",
          required: true,
          placeholder: "Enter a password at least 8 characters",
          type: "password",
          displayOrder: 2
        }
      ]
    };
    return (
      <ScrollView style={styles.container}>
        <Authenticator
          hideDefault={true}
          onStateChange={authState => this.authStateChange(authState)}
          amplifyConfig={amplifyConfig}
        >
          <SignIn />
          <SignUp signUpConfig={signUpConfig} />
          <ForgotPassword />
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

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, ListItem } from "react-native-elements";
import {
  Authenticator,
  SignIn,
  SignUp,
  ForgotPassword,
  ConfirmSignUp
} from "aws-amplify-react-native";

import amplifyConfig from "../aws-exports";
import { Auth, Hub, Logger } from "aws-amplify";

export default class AuthSignUpScreen extends React.Component {
  static navigationOptions = {
    title: "Sign Up"
  };
  state: {};

  handleSubmit = async () => {
    const phone = "+12678086023";
    const password = "testtest";

    try {
      const newUser = await Auth.signUp({
        username: phone,
        password
      });

      this.setState({ isLoading: false });
      console.log(newUser);
    } catch (e) {
      console.log("error", e.message);
      this.setState({ isLoading: false });
    }
  };
  handleSubmit2 = async () => {
    const phone = "+12678086023";
    const password = "testtest";

    try {
      const newUser = await Auth.signIn(phone, password);
      this.props.navigation.navigate("Main");
    } catch (e) {
      console.log("error", e);
      this.setState({ isLoading: false });
    }
  };

  handleSubmit3 = () => {
    this.props.navigation.navigate("AuthVerify");
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Button title="Sign Up" onPress={this.handleSubmit} />
        <Button title="Sign In" onPress={this.handleSubmit2} />
        <Button title="Verify" onPress={this.handleSubmit3} />
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

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, ListItem, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Authenticator,
  SignIn,
  SignUp,
  ForgotPassword,
  ConfirmSignUp
} from "aws-amplify-react-native";

import amplifyConfig from "../aws-exports";
import { Auth, Hub, Logger } from "aws-amplify";
import { phoneNumberIsTaken } from "../utils/api";

export default class AuthSignUpScreen extends React.Component {
  static navigationOptions = {
    title: "Sign Up"
  };
  state = { phone: "+12678086023", password: "testtest" };

  handleSubmit = async () => {
    const { phone, password } = this.state;

    if (await phoneNumberIsTaken(phone)) {
      this.setState({
        isLoading: false,
        phoneErrorMessage: "That number is already registered.",
        passwordErrorMessage: null
      });
      return;
    }

    try {
      const newUser = await Auth.signUp({
        username: phone,
        password
      });

      // this.props.navigation.navigate("AuthVerify")
      console.log(newUser);
    } catch (e) {
      console.log("error", e.message);
      this.setState({
        isLoading: false,
        phoneErrorMessage: e.message,
        passwordErrorMessage: null
      });
    }
  };

  handleSubmit3 = () => {
    this.props.navigation.navigate("AuthVerify");
  };
  render() {
    const {
      phone,
      password,
      phoneErrorMessage,
      passwordErrorMessage
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Input
          label="The phone you will login with"
          placeholder="Enter your phone"
          onChange={text => {
            this.setState({ phone: text });
          }}
          value={phone}
          errorMessage={phoneErrorMessage}
        />
        <Input
          label="Your password"
          placeholder="Enter at least 8 characters"
          secureTextEntry={true}
          onChange={text => {
            this.setState({ password: text });
          }}
          value={password}
          errorMessage={passwordErrorMessage}
        />
        <Button title="Sign Up" onPress={this.handleSubmit} />
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

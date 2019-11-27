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

export default class AuthVerifyScreen extends React.Component {
  static navigationOptions = {
    title: "Verify Phone"
  };
  state: {};

  handleSubmit = async () => {
    const phone = "+12678086023";
    const code = "code";

    try {
      await Auth.verifyCurrentUserAttributeSubmit(
        { phone_number: phone },
        code
      );
    } catch (e) {
      console.log("error verifying", e);
      this.setState({ errorMessage: e.message }); //todo
    }
  };
  async componentDidMount() {
    const phone = "+12678086023";

    try {
      await Auth.verifyCurrentUserAttribute({ phone_number: phone });
    } catch (e) {
      console.log("error sending code", e);
      this.setState({ errorMessage: e.message }); //todo
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Button title="Continue" onPress={this.handleSubmit} />
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

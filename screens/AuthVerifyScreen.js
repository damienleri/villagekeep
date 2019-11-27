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
    const code = "137166";

    try {
      await Auth.confirmSignUp(phone, code);
      this.props.navigation.navigate("Home");
    } catch (e) {
      console.log("error verifying", e.message);
      this.setState({ errorMessage: e.message }); //todo
    }
  };

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

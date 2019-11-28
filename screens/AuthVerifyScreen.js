import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Icon, Layout, Text, Button } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
// import {
//   ConfirmSignUp
// } from "aws-amplify-react-native";

import amplifyConfig from "../aws-exports";
import { Auth, Hub, Logger } from "aws-amplify";

const codeLength = 6;

export default class AuthVerifyScreen extends React.Component {
  static navigationOptions = {
    title: "Verify Phone"
  };
  state = { code: "" };

  handleChangeCode = async code => {
    if (code.length === codeLength) {
      this.setState({
        code,
        isCorrectLength: true,
        codeErrorMessage: null
      });
    } else {
      this.setState({
        code,
        isValidCode: false,
        codeErrorMessage: null
      });
    }
  };
  handleSubmit = async () => {
    const phone = this.props.navigation.getParam("phone");
    const { code } = this.state;
    console.log(phone, code);

    try {
      await Auth.confirmSignUp(phone, code);
      this.props.navigation.navigate("Home");
    } catch (e) {
      console.log("error verifying", e);
      this.setState({ codeErrorMessage: e.message, isResent: false }); //todo
    }
  };
  handleResend = async () => {
    const phone = this.props.navigation.getParam("phone");
    try {
      await Auth.resendSignUp(phone);
      this.setState({ isResent: true });
    } catch (e) {
      console.log("error resending", e);
      this.setState({ resendErrorMessage: e.message }); //todo
    }
  };
  render() {
    const {
      code,
      codeErrorMessage,
      isCorrectLength,
      isResent,
      resendErrorMessage
    } = this.state;
    return (
      <Layout style={styles.container}>
        <Form style={styles.form}>
          <Text category="h5" style={styles.header}>
            Verify your phone number
          </Text>
          <Text style={styles.introText}>
            Please enter the code sent to you by text message. It expires after
            24 hours.
          </Text>
          <FormInput
            label={`${codeLength}-digit code`}
            placeholder=""
            onChangeText={this.handleChangeCode}
            value={code}
            status={codeErrorMessage ? "danger" : null}
            caption={codeErrorMessage}
            keyboardType={"number-pad"}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={!isCorrectLength}
          >
            Verify
          </FormSubmitButton>
          {resendErrorMessage && (
            <Text status="danger">{resendErrorMessage}</Text>
          )}
          {isResent && <Text status="success">Code resent.</Text>}
          <Button appearance="ghost" onPress={this.handleResend}>
            Send another code
          </Button>
        </Form>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: { marginTop: 50, marginBottom: 20 },
  introText: { marginBottom: 10 }
});

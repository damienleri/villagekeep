import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Layout, Text } from "@ui-kitten/components";
import Auth from "@aws-amplify/auth";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { parsePhoneTyping, validatePasswordChoice } from "../utils/etc";
import { minPasswordLength } from "../utils/constants";

const codeLength = 6;
export default class AuthForgotPasswordVerifyScreen extends React.Component {
  state = { code: "", password: "" };

  constructor() {
    super();
    this.codeInputRef = React.createRef();
  }
  componentDidMount() {
    this.codeInputRef.current.focus();
  }

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
        isCorrectLength: false,
        codeErrorMessage: null
      });
    }
  };

  handleChangePassword = async password => {
    const { error } = validatePasswordChoice(password);
    this.setState({
      password,
      isValidPassword: !error,
      passwordErrorMessage: error
    });
  };

  handleSubmit = async () => {
    const { code, password } = this.state;
    const phone = this.props.navigation.getParam("phone");
    this.setState({ isSubmitting: true });

    try {
      await Auth.forgotPasswordSubmit(phone, code, password);
      await Auth.signIn(phone, password);
      this.props.navigation.navigate("Home", { fromForgotPassword: true });
    } catch (e) {
      if (e.code === "UserNotFoundException") {
        // no such phone in system
        this.setState({
          isSubmitting: false,
          error: "This phone is not registered."
        });
      } else if (e.code === "InvalidParameterException") {
        // account is unconfirmed
        try {
          await Auth.resendSignUp(fullPhone);
          this.props.navigation.navigation("AuthVerify", { phone: fullPhone });
        } catch (e) {
          this.setState({
            isSubmitting: false,
            error:
              "This phone is not fully registered and I was not able to send verification code."
          });
        }
      } else {
        // probably just an invalid code.
        this.setState({ error: e.message, isSubmitting: false });
      }
    }
  };

  render() {
    const {
      error,
      code,
      password,
      showPassword,
      codeErrorMessage,
      passwordErrorMessage,
      isValidPassword,
      isSubmitting,
      isCorrectLength
    } = this.state;
    return (
      <Layout style={styles.container}>
        <Form style={styles.form}>
          <Text category="h5" style={styles.header}>
            Choose New Password
          </Text>
          <FormInput
            label={`${codeLength}-digit code`}
            placeholder=""
            onChangeText={this.handleChangeCode}
            value={code}
            status={
              codeErrorMessage ? "danger" : isCorrectLength ? "success" : null
            }
            caption={codeErrorMessage}
            oneTimeCode="oneTimeCode"
            keyboardType={"number-pad"}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            ref={this.codeInputRef}
          />
          <FormInput
            label="New password"
            placeholder={`At least ${minPasswordLength} characters`}
            secureTextEntry={!showPassword}
            textContentType="newPassword"
            onChangeText={this.handleChangePassword}
            value={password}
            status={
              !password.length
                ? null
                : passwordErrorMessage || !isValidPassword
                ? "danger"
                : "success"
            }
            icon={style => (
              <Icon
                {...style}
                name={showPassword ? "eye-outline" : "eye-off-2-outline"}
              />
            )}
            onIconPress={() => this.setState({ showPassword: !showPassword })}
            caption={passwordErrorMessage}
          />
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={!isValidPassword || isSubmitting || !isCorrectLength}
          >
            {isSubmitting ? "Saving password..." : "Save Password"}
          </FormSubmitButton>
          {error && <Text status="danger">{error}</Text>}
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

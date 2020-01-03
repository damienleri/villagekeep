import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Layout, Text } from "@ui-kitten/components";
import Auth from "@aws-amplify/auth";
import Form from "../components/Form";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { parsePhoneTyping } from "../utils/etc";

// import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";

export default class AuthSignUpTab extends React.Component {
  state = {
    phone: "",
    fullPhone: "",
    password: ""
  };

  componentDidMount() {
    // for testing:
    if (false) {
      this.setState({
        isValidPhone: true,
        phone: "+12678086023",
        fullPhone: "+12678086023",
        password: ""
      });
    }
  }

  handleChangePhone = async text => {
    const { phone, isValidPhone, fullPhone } = parsePhoneTyping({
      text,
      previousText: this.state.phone
    });
    this.setState({
      phone,
      isValidPhone,
      fullPhone,
      phoneErrorMessage: null
    });
  };

  handleChangePassword = async password => {
    this.setState({
      password,
      passwordErrorMessage: null
    });
  };

  handleSubmit = async () => {
    const { fullPhone, password } = this.state;
    this.setState({ isLoading: true });
    try {
      const newUser = await Auth.signIn(fullPhone, password);
      this.props.navigation.navigate("Home", { fromLogin: true });
    } catch (e) {
      let phoneErrorMessage = null,
        passwordErrorMessage = null;
      console.log(e);
      if (e.code === "UserNotConfirmedException") {
        // Account was not verified
        try {
          await Auth.resendSignUp(fullPhone);
          return this.props.navigation.navigate("AuthVerify", {
            phone: fullPhone
          });
        } catch (e) {
          this.setState({
            phoneErrorMessage: `Error resending your verification code: ${e.message}`
          });
        }
      } else if (e.code === "PasswordResetRequiredException") {
        passwordErrorMessage =
          "Your password was reset by an administrator. Please use the Forgot password feature to reset it.";
      } else if (e.code === "UserNotFoundException") {
        phoneErrorMessage =
          "That phone is not signed up. Please go to Sign up.";
      } else if (e.code === "NotAuthorizedException") {
        passwordErrorMessage = "Sorry, that's not the right password.";
      } else {
        passwordErrorMessage = `Error from server: ${e.message}`;
      }
      this.setState({
        phoneErrorMessage,
        passwordErrorMessage,
        isLoading: false
      });
    }
  };

  render() {
    const {
      phone,
      password,
      phoneErrorMessage,
      passwordErrorMessage,
      showPassword,
      isValidPhone,
      isLoading
    } = this.state;
    return (
      <Form>
        <Text category="h6" style={styles.header}>
          Welcome back
        </Text>
        <FormInput
          label="Phone number"
          placeholder=""
          textContentType="telephoneNumber"
          onChangeText={this.handleChangePhone}
          value={phone}
          status={
            !phone.length
              ? null
              : phoneErrorMessage || !isValidPhone
              ? "danger"
              : "success"
          }
          caption={phoneErrorMessage}
          keyboardType={"phone-pad"}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          label="Password"
          placeholder={``}
          secureTextEntry={!showPassword}
          textContentType="password"
          onChangeText={this.handleChangePassword}
          value={password}
          status={
            !password.length
              ? null
              : passwordErrorMessage
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
          disabled={!isValidPhone || !password.length || isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </FormSubmitButton>

        <Button
          appearance="ghost"
          onPress={() => this.props.navigation.navigate("AuthForgotPassword")}
        >
          Forgot password?
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center"
  }
});

import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Layout, Text } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { Auth } from "aws-amplify";

const minPasswordLength = 8;
export default class AuthSignUpTab extends React.Component {
  state = {
    phone: "",
    validPhone: "",
    password: ""
  };

  componentDidMount() {
    // for testing:
    if (false) {
      this.setState({
        isValidPhone: true,
        isValidPassword: true,
        phone: "+12678086023",
        validPhone: "+12678086023",
        password: "testtest1"
      });
      this.props.navigation.navigate("AuthVerify", {
        phone: "+12678086023",
        password: "testtest1"
      });
    }
  }

  handleChangePhone = async text => {
    const parsed = parsePhoneNumberFromString(text, "US");
    const isValidPhone = !!parsed && parsed.isValid();
    const isBackspace = text.length < this.state.phone.length;
    const phone = isBackspace ? text : new AsYouType("US").input(text);

    this.setState({
      phone,
      validPhone: isValidPhone ? parsed.format("E.164") : null,
      phoneErrorMessage: null
    });
  };
  handleChangePassword = async password => {
    const tooShort = password.length < minPasswordLength;
    const tooSimple = password.match(/^([A-Za-z]+|\d+)$/);
    this.setState({
      password,
      isValidPassword: !tooShort && !tooSimple,
      passwordErrorMessage: !password.length
        ? null
        : tooShort
        ? "At least 8 characters please"
        : tooSimple
        ? "Include numbers or other characters please"
        : null
    });
  };

  handleSubmit = async () => {
    const { validPhone, password } = this.state;
    this.setState({ isLoading: true });
    try {
      const newUser = await Auth.signUp({
        username: validPhone,
        password
      });
      this.props.navigation.navigate("AuthVerify", {
        phone: validPhone,
        password /* The verify screen uses the password to login the user once verified. */
      });
    } catch (e) {
      this.setState({
        isLoading: false,
        phoneErrorMessage:
          e.code === "UsernameExistsException"
            ? "That phone is already signed up. Please check the number, or else login or reset your password."
            : e.message
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
      validPhone,
      isValidPassword,
      isLoading
    } = this.state;
    return (
      <Form>
        <Text category="h6" style={styles.header}>
          Get started now
        </Text>
        <FormInput
          label="Phone number"
          placeholder="Your phone"
          onChangeText={this.handleChangePhone}
          value={phone}
          status={
            !phone.length
              ? null
              : phoneErrorMessage || !validPhone
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
          placeholder={`At least ${minPasswordLength} characters`}
          secureTextEntry={!showPassword}
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
          disabled={!validPhone || !isValidPassword || isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </FormSubmitButton>
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

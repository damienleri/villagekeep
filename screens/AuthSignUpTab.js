import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Layout, Text } from "@ui-kitten/components";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { parsePhoneTyping } from "../utils/etc";
import Auth from "@aws-amplify/auth";
import { minPasswordLength } from "../utils/constants";
import { validatePasswordChoice } from "../utils/etc";

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
    const { phone, isValidPhone, fullPhone } = parsePhoneTyping({
      text,
      previousText: this.state.phone
    });
    this.setState({
      phone,
      fullPhone,
      isValidPhone,
      phoneErrorMessage: null
    });
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
    const { fullPhone, password } = this.state;
    this.setState({ isSubmitting: true });
    try {
      const newUser = await Auth.signUp({
        username: fullPhone,
        password
      });
      this.props.navigation.navigate("AuthVerify", {
        phone: fullPhone,
        password /* The verify screen uses the password to login the user once verified. */
      });
    } catch (e) {
      this.setState({
        isSubmitting: false,
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
      isValidPhone,
      isValidPassword,
      isSubmitting
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
          textContentType="telephoneNumber"
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
        />
        <FormInput
          label="Password"
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
          disabled={!isValidPhone || !isValidPassword || isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
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

import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Layout, Text } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { Auth } from "aws-amplify";
import { phoneNumberIsTaken } from "../utils/api";

const minPasswordLength = 8;
export default class AuthSignUpTab extends React.Component {
  state = {
    isValidPhone: false,
    isValidPassword: false,
    phone: "",
    fullPhone: "",
    password: "",
    phoneErrorMessage: null,
    passwordErrorMessage: null
  };

  constructor() {
    super();
    this.phoneInputRef = React.createRef();
  }
  componentDidMount() {
    // this.phoneInputRef.current.focus();
    // for testing:
    if (false) {
      this.setState({
        isValidPhone: true,
        isValidPassword: true,
        phone: "+12678086023",
        fullPhone: "+12678086023",
        password: "testtest"
      });
      this.props.navigation.navigate("AuthVerify", { phone: "+12678086023" });
    }
  }

  handleChangePhone = async text => {
    const parsed = parsePhoneNumberFromString(text, "US");
    const templated = new AsYouType("US").input(text);

    if (parsed && parsed.isValid()) {
      if (parsed.country !== "US") {
        this.setState({
          phone: templated,
          isValidPhone: false,
          phoneErrorMessage: "Only US numbers for now"
        });
      } else {
        this.setState({
          phone: templated,
          isValidPhone: true,
          phoneErrorMessage: null,
          fullPhone: parsed.format("E.164")
        });
      }
    } else {
      this.setState({
        phone: templated,
        isValidPhone: false,
        phoneErrorMessage: null
      });
    }
  };
  handleChangePassword = async password => {
    if (password.length >= minPasswordLength) {
      this.setState({
        password,
        isValidPassword: true,
        passwordErrorMessage: null
      });
    } else {
      this.setState({
        password,
        isValidPassword: false,
        passwordErrorMessage: password.length ? "At least 8 characters" : null
      });
    }
  };

  handleSubmit = async () => {
    const { fullPhone, password } = this.state;

    try {
      const newUser = await Auth.signUp({
        username: fullPhone,
        password
      });
      this.props.navigation.navigate("AuthVerify", { phone: fullPhone });
    } catch (e) {
      this.setState({
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
      isValidPassword
    } = this.state;
    return (
      <Form style={styles.form}>
        <Text category="h6" style={styles.header}>
          Get started now
        </Text>
        <FormInput
          label="Phone Number"
          placeholder="Your phone"
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
          ref={this.phoneInputRef}
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
          disabled={!isValidPhone || !isValidPassword}
        >
          Sign up
        </FormSubmitButton>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#666"
  }
});

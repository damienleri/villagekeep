import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Icon, Layout, Text } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import amplifyConfig from "../aws-exports";
import { Auth, Hub, Logger } from "aws-amplify";
import { phoneNumberIsTaken } from "../utils/api";

const minPasswordLength = 8;
export default class AuthSignUpScreen extends React.Component {
  static navigationOptions = {
    title: "Sign up"
  };
  state = {
    isValidPhone: false,
    isValidPassword: false,
    phone: "",
    fullPhone: "",
    password: "",
    phoneErrorMessage: null,
    passwordErrorMessage: null
  };

  componentDidMount() {
    // for testing:
    this.setState({
      isValidPhone: true,
      isValidPassword: true,
      phone: "+12678086023",
      fullPhone: "+12678086023",
      password: "testtest"
    });
    this.props.navigation.navigate("AuthVerify", { phone: "+12678086023" });
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
        passwordErrorMessage: "At least 8 characters"
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
      if (e.code === "UsernameExistsException") {
        this.setState({
          phoneErrorMessage: "That phone is already signed up."
        });
      } else {
        this.setState({
          phoneErrorMessage: e.message
        });
      }
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
      <Layout style={styles.container}>
        <Form style={styles.form}>
          <Text category="h5" style={styles.header}>
            Create your account
          </Text>
          <FormInput
            label="Phone Number"
            placeholder="Your phone"
            onChangeText={this.handleChangePhone}
            icon={style => <Icon {...style} name="phone-outline" />}
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
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: { marginTop: 50, marginBottom: 20 }
});

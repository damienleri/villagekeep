import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Layout, Text } from "@ui-kitten/components";
import Auth from "@aws-amplify/auth";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { parsePhoneTyping } from "../utils/etc";

export default class AuthForgotPasswordScreen extends React.Component {
  state = { phone: "" };

  constructor() {
    super();
    this.phoneInputRef = React.createRef();
  }
  componentDidMount() {
    this.phoneInputRef.current.focus();
    if (0) {
      this.setState({
        isValidPhone: true,
        phone: "+12678086023",
        fullPhone: "+12678086023"
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
      error: null
    });
  };
  handleSubmit = async () => {
    const { fullPhone } = this.state;

    try {
      await Auth.forgotPassword(fullPhone);
      this.props.navigation.navigate("AuthForgotPasswordVerify", {
        phone: fullPhone
      });
    } catch (e) {
      if (e.code === "UserNotFoundException") {
        // no such phone in system
        this.setState({ error: "This phone is not registered." });
      } else if (e.code === "InvalidParameterException") {
        // account is unconfirmed
        try {
          await Auth.resendSignUp(fullPhone);
          this.props.navigation.navigation("AuthVerify", { phone: fullPhone });
        } catch (e) {
          this.setState({
            error:
              "This phone is not registered but was not able to send verification code."
          });
        }
      } else {
        this.setState({ error: e.message });
      }
    }
  };

  render() {
    const { error, phone, isValidPhone } = this.state;
    return (
      <Layout style={styles.container}>
        <Form style={styles.form}>
          <Text category="h5" style={styles.header}>
            Forgot Password
          </Text>
          <FormInput
            label="Phone"
            placeholder=""
            onChangeText={this.handleChangePhone}
            value={phone}
            returnKeyType="done"
            autoCorrect={false}
            ref={this.phoneInputRef}
            keyboardType={"phone-pad"}
            returnKeyType="done"
          />
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={!isValidPhone}
          >
            Send Access Code
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

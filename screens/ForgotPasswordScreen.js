import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Layout, Text, Button } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { Auth } from "aws-amplify";

export default class ForgotPasswordScreen extends React.Component {
  state = { firstName: "", lastName: "", isParent: null };

  constructor() {
    super();
    this.firstNameInputRef = React.createRef();
  }
  componentDidMount() {
    this.firstNameInputRef.current.focus();
  }

  handleSubmit = async () => {
    // const { firstName, lastName, isParent } = this.state;
    // console.log(firstName, lastName, isParent);

    // todo: forgot password code:
    try {
      await Auth.forgotPassword(fullPhone);
      this.setState({ isSent: true });
    } catch (e) {
      if (e.code === "UserNotFoundException") {
        // no such phone in system
      } else if (e.code === "InvalidParameterException") {
        // account is unconfirmed
        try {
          await Auth.resendSignUp(fullPhone);
          this.props.navigation.navigation("AuthVerify", { phone: fullPhone });
        } catch (e) {}
      } else {
        e.message;
      }
    }

    // this.props.navigation.navigate("Main");
  };

  render() {
    const { errorMessage, firstName, lastName, isParent } = this.state;
    return (
      <Layout style={styles.container}>
        <Form style={styles.form}>
          <Text category="h5" style={styles.header}>
            One more step
          </Text>
          <Text style={styles.introText}>
            This will customize your experience based on whether you are the
            parent/guardian or the teenager.
          </Text>
          <FormInput
            label="First Name"
            placeholder=""
            onChangeText={firstName =>
              this.setState({ firstName, errorMessage: false })
            }
            value={firstName}
            returnKeyType="done"
            autoCorrect={false}
            ref={this.firstNameInputRef}
          />
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={firstName && lastName && isParent}
          >
            Verify
          </FormSubmitButton>
          {errorMessage && <Text status="danger">{errorMessage}</Text>}
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

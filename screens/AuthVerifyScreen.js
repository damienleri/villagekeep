import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Icon, Layout, Text, Button } from "@ui-kitten/components";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import Auth from "@aws-amplify/auth";
import { createCurrentUser } from "../utils/api";
import { gutterWidth } from "../utils/style";
import { setSettings as setSettingsType } from "../redux/actions";
import TopNavigation from "../components/TopNavigation";

const codeLength = 6;

class AuthVerifyScreen extends React.Component {
  state = { code: "" };
  static navigationOptions = props => ({
    header: <TopNavigation {...props} hideBack={true} />
  });
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
  handleSubmit = async () => {
    const phone = this.props.navigation.getParam("phone");
    const password = this.props.navigation.getParam("password");
    const { code } = this.state;
    const { settings, setSettings } = this.props;
    this.setState({ isLoading: true, isResent: false });
    try {
      await Auth.confirmSignUp(phone, code);
    } catch (e) {
      // NotAuthorizedException means already confirmed so continue with account creation
      if (e.code !== "NotAuthorizedException") {
        this.setState({
          codeErrorMessage: `Error verifying: ${e.message}`,
          isLoading: false
        });
        return;
      }
    }

    try {
      await Auth.signIn(phone, password);
    } catch (e) {
      this.setState({
        codeErrorMessage: `Error signing in: ${e.message}`,
        isLoading: false
      });
      return;
    }

    const { error: createUserError, user } = await createCurrentUser();
    if (createUserError) {
      this.setState({ codeErrorMessage: createUserError, isLoading: false });
      return;
    }

    setSettings({ user });
    this.props.navigation.navigate("AuthEditAccount", { isNewUser: true });
    return;
  };

  handleResend = async () => {
    const phone = this.props.navigation.getParam("phone");
    this.setState({ isLoadingResend: true });
    try {
      await Auth.resendSignUp(phone);
      this.setState({ isResent: true, isLoadingResend: false });
    } catch (e) {
      console.log("error resending", e);
      this.setState({ resendErrorMessage: e.message, isLoadingResend: false });
    }
  };

  render() {
    const {
      code,
      codeErrorMessage,
      isCorrectLength,
      isResent,
      resendErrorMessage,
      isLoading,
      isLoadingResend
    } = this.state;
    return (
      <Layout style={styles.container}>
        <View style={styles.intro}>
          <Text category="h5" style={styles.header}>
            Verify your phone number
          </Text>
          <Text style={styles.introText}>
            Please enter the code sent to you by text message. It expires after
            24 hours.
          </Text>
        </View>
        <Form>
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
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={!isCorrectLength || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </FormSubmitButton>
          {resendErrorMessage && (
            <Text status="danger">{resendErrorMessage}</Text>
          )}
          {isResent && <Text status="success">Code resent.</Text>}
          <Button
            appearance="ghost"
            onPress={this.handleResend}
            disabled={isLoadingResend}
          >
            {isLoadingResend ? "Resending code..." : "Resend code"}
          </Button>
          <Button
            appearance="ghost"
            onPress={() =>
              this.props.navigation.navigate("AuthHome", { selectedIndex: 1 })
            }
          >
            Entered wrong phone number?
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default connect(({ settings }) => ({ settings }), {
  setSettings: setSettingsType
})(AuthVerifyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: { marginHorizontal: gutterWidth },
  header: { marginTop: 50, marginBottom: 10 },
  introText: { marginBottom: 10 }
});

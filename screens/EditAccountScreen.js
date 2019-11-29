import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Layout, Text, Button } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { Auth } from "aws-amplify";

export default class EditAccountScreen extends React.Component {
  static navigationOptions = {
    title: "Account"
  };
  state = { firstName: "", lastName: "", isParent: null };

  constructor() {
    super();
    this.firstNameInputRef = React.createRef();
  }
  componentDidMount() {
    this.firstNameInputRef.current.focus();
  }

  handleSubmit = async () => {
    const { firstName, lastName, isParent } = this.state;
    console.log(firstName, lastName, isParent);

    try {
    } catch (e) {
      console.log("error updating user", e);
      this.setState({ errorMessage: e.message });
      return;
    }

    this.props.navigation.navigate("Home");
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

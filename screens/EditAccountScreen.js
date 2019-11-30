import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Layout, Text, Button, Radio } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";

export default class EditAccountScreen extends React.Component {
  static navigationOptions = props => ({
    header: <TopNavigation {...props} />
  });
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
    const {
      errorMessage,
      firstName,
      lastName,
      isParent,
      isParentMessage,
      isKid
    } = this.state;
    return (
      <Layout style={styles.container}>
        <Form style={styles.form}>
          <Text category="h5" style={styles.header}>
            Last step
          </Text>
          <Text style={styles.introText}>
            This identifies you within the "village".
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
          <FormInput
            label="Last Name"
            placeholder=""
            onChangeText={lastName =>
              this.setState({ lastName, errorMessage: false })
            }
            value={lastName}
            returnKeyType="done"
            autoCorrect={false}
          />
          <Layout style={styles.radioRow}>
            <Radio
              style={styles.radio}
              status="primary"
              text="Parent/Guardian"
              checked={isParent}
              onChange={isParent =>
                this.setState({
                  isParent,
                  isParentMessage: "Chief Chaperone in the house!"
                })
              }
            />
            <Radio
              style={styles.radio}
              status="primary"
              text="Teen"
              checked={isKid}
              onChange={isKid =>
                this.setState({
                  isKid,
                  isParentMessage: "Small fry are the future!"
                })
              }
            />
          </Layout>
          {isParentMessage && (
            <Text style={styles.isParentMessage} status="success">
              {isParentMessage}
            </Text>
          )}
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={firstName && lastName && (isParent || isKid)}
          >
            Get started
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
  header: { marginTop: 0, marginBottom: 20 },
  introText: { marginBottom: 10 },
  radioRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 8
  },
  radio: {
    marginVertical: 4,
    marginHorizontal: 4
  },
  isParentMessage: {
    marginTop: 4,
    marginBottom: 8,
    textAlign: "center"
  }
});

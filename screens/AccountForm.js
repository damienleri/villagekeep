import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Layout, Text, Button, Radio } from "react-native-ui-kitten";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import { getCurrentUser, updateUser } from "../utils/api";

export default class AccountForm extends React.Component {
  state = { firstName: "", lastName: "", isParent: null };

  constructor() {
    super();
    this.firstNameInputRef = React.createRef();
  }
  componentDidMount() {
    this.firstNameInputRef.current.focus();
  }

  handleSubmit = async () => {
    const { navigation, onSave } = this.props;
    const { firstName, lastName, isParent } = this.state;
    this.setState({ isLoading: true });
    const {
      user: currentUser,
      error: getCurrentUserError
    } = await getCurrentUser();

    console.log("accountform", firstName, lastName, isParent, currentUser);

    if (getCurrentUserError)
      return this.setState({ errorMessage: getCurrentUserError });

    const { error } = await updateUser({
      id: currentUser.id,
      firstName,
      lastName,
      isParent
    });

    if (error) {
      console.log("error updating user", error);
      return this.setState({ errorMessage: error, isLoading: false });
    }

    await onSave();
  };

  render() {
    const {
      errorMessage,
      firstName,
      lastName,
      isParent,
      isParentMessage,
      isKid,
      isLoading
    } = this.state;
    return (
      <Form>
        <FormInput
          label="First name"
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
          label="Last name"
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
            text="Parent or guardian"
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
        {errorMessage && (
          <Text style={styles.errorMessage} status="danger">
            {errorMessage}
          </Text>
        )}
        <FormSubmitButton
          onPress={this.handleSubmit}
          disabled={
            !firstName || !lastName || !(isParent || isKid) || isLoading
          }
        >
          {isLoading ? "Getting started..." : "Get started"}
        </FormSubmitButton>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  errorMessage: {
    marginTop: 4,
    marginBottom: 8,
    textAlign: "center"
  }
});

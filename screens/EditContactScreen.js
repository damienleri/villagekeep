import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Button,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
  Spinner
} from "react-native-ui-kitten";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { getCurrentUser, createContact } from "../utils/api";
import { gutterWidth } from "../utils/style";

export default class EditContactScreen extends React.Component {
  state = {};
  constructor() {
    super();
    this.firstNameInputRef = React.createRef();
  }
  componentDidMount() {
    this.firstNameInputRef.current.focus();
  }
  handleChangePhone = async text => {
    const parsed = parsePhoneNumberFromString(text, "US");
    const isValidPhone = !!parsed && parsed.isValid();
    const phone = new AsYouType("US").input(text);
    this.setState({
      phone,
      isValidPhone,
      fullPhone: isValidPhone ? parsed.format("E.164") : null,
      phoneErrorMessage: null
    });
  };

  handleSubmit = async () => {
    const type = navigation.getParam("type");
    const { contact, error: createContactError } = await createContact({
      firstName,
      lastName,
      phone,
      type
    });
    if (createContactError) {
      this.setState({ errorMessage: createContactError });
      return;
    }
    console.log("created contact", contact);
  };
  render() {
    const { navigation } = this.props;
    const {
      errorMessage,
      firstName,
      lastName,
      phone,
      isLoading,
      phoneErrorMessage,
      isValidPhone
    } = this.state;
    const contact = navigation.getParam("contact");
    const type = navigation.getParam("type");

    return (
      <Layout style={styles.container}>
        <View style={styles.intro}>
          <Text category="h5" style={styles.header}>
            {contact ? "Let's edit this " : "Let's add this "}
            {type}
          </Text>
          <Text style={styles.introText}></Text>
        </View>

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
          <FormInput
            label="Phone number"
            placeholder=""
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
          />
          {errorMessage && (
            <Text style={styles.errorMessage} status="danger">
              {errorMessage}
            </Text>
          )}
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={!firstName || !lastName || !phone || isLoading}
          >
            {isLoading ? "Saving contact" : "Save"}
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
  intro: { marginHorizontal: gutterWidth },
  header: { marginTop: 20, marginBottom: 10 },
  introText: { marginBottom: 10 },
  errorMessage: {
    marginTop: 4,
    marginBottom: 8,
    textAlign: "center"
  }
});

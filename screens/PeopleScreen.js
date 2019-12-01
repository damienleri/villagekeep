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
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { Linking } from "expo";
import { getCurrentUser, createContact } from "../utils/api";
import { formatPhone } from "../utils/etc";
import { gutterWidth, textLinkColor } from "../utils/style";

const AddContactButton = props => (
  <Button
    {...props}
    appearance={props.appearance}
    style={[props.style, styles.addContactButton]}
    textStyle={styles.addContactButtonText}
  >
    {props.children}
  </Button>
);

AddContactActions = ({ isParent, appearance, handleAddContact }) => (
  <View style={styles.addContactActions}>
    {isParent ? (
      <AddContactButton
        appearance={appearance}
        onPress={() => handleAddContact({ type: "kid" })}
      >
        Add a kid
      </AddContactButton>
    ) : (
      <React.Fragment>
        <AddContactButton
          appearance={appearance}
          onPress={() => handleAddContact({ type: "parent" })}
        >
          Add parent
        </AddContactButton>
        <AddContactButton
          appearance={appearance}
          onPress={() => handleAddContact({ type: "friend" })}
        >
          Add friend
        </AddContactButton>
      </React.Fragment>
    )}
  </View>
);

ContactsEmptyState = ({ isParent, handleAddContact }) => (
  <View>
    <Text category="h6" style={{ fontWeight: "normal" }}>
      You are ready to add {isParent ? "a teeny bopper" : "parents and friends"}
      . Let's do this!
    </Text>
    <AddContactActions
      isParent={isParent}
      handleAddContact={handleAddContact}
      appearance="primary"
    />
  </View>
);

export default class PeopleScreen extends React.Component {
  state = {};
  componentDidMount = async () => {
    /* call loadUserData() whenever this screen is displayed, in case data has changed */

    this.loadUserDataSubcription = this.props.navigation.addListener(
      "didFocus",
      async () => {
        await this.loadUserData();
      }
    );
  };
  componentWillUnmount() {
    this.loadUserDataSubcription.remove();
  }
  loadUserData = async () => {
    const { user, error: currentUserError } = await getCurrentUser();
    if (currentUserError)
      return this.setState({
        generalErrorMessage: `Error: ${currentUserError}`
      });
    this.setState({ user, userLoaded: true });
  };

  handleAddContact = ({ type }) => {
    this.props.navigation.navigate("EditContact", { type });
  };
  handleEditContact = ({ contact }) => {
    this.props.navigation.navigate("EditContact", { contact });
  };

  handlePhonePress = ({ phone }) => {
    Linking.openURL(`tel:${phone}`);
  };
  renderContact = (contact, index) => {
    let { firstName, lastName, phone, isParent } = contact;
    return (
      <View key={index} style={styles.contact}>
        <Text style={styles.contactName}>
          {firstName} {lastName}
        </Text>
        <Text
          style={styles.contactPhone}
          onPress={() => this.handlePhonePress({ phone })}
        >
          {formatPhone(phone)}
        </Text>
        <Button
          appearance="ghost"
          onPress={() => this.handleEditContact({ contact })}
        >
          Edit
        </Button>
      </View>
    );
  };
  renderContactsList = () => {
    // <Card>
    //   <CardHeader>Dale Cooper</CardHeader>
    //   <Text>267</Text>
    // </Card>
    const { user } = this.state;

    const { isParent } = user;
    // const contacts = [
    //   { firstName: "d", lastName: "l", phone: "22", isParent: false }
    // ];

    const filtered = user.contacts.items.filter(c =>
      isParent ? !c.isParent : c.isParent
    );
    if (!filtered.length) return null;

    return (
      <View>
        <AddContactActions
          isParent={isParent}
          handleAddContact={this.handleAddContact}
          appearance="ghost"
        />
        <Text style={styles.contactsHeader} category="h6">
          {isParent ? "Your kids" : "Your parents"}
        </Text>
        {filtered.map(this.renderContact)}
      </View>
    );
  };
  render() {
    const { generalErrorMessage, user, userLoaded } = this.state;

    return (
      <Layout style={styles.container}>
        {generalErrorMessage && (
          <Text status="danger" style={styles.generalErrorMessage}>
            {generalErrorMessage}
          </Text>
        )}
        <Text category="h4">This is your village</Text>
        <View style={styles.contactsContainer}>
          {!userLoaded ? (
            <Spinner />
          ) : (
            this.renderContactsList() || (
              <ContactsEmptyState
                isParent={user.isParent}
                handleAddContact={this.handleAddContact}
              />
            )
          )}
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: gutterWidth
  },
  generalErrorMessage: {
    marginVertical: 20
  },
  contactsContainer: { paddingVertical: 0 },
  contact: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    marginVertical: 10
  },
  contactName: { fontWeight: "bold" },
  contactPhone: { color: textLinkColor, marginVertical: 5 },
  addContactActions: {
    marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  addContactButton: { marginVertical: 10 },
  addContactButtonText: { textTransform: "uppercase" }
});

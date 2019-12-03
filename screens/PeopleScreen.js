import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
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
import { groupBy } from "lodash";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { Linking } from "expo";
import { getCurrentUser } from "../utils/api";
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
    <Text category="h6" style={styles.emptyStateIntroText}>
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
  handleRefresh = async () => {
    this.setState({ isRefreshing: true });
    await this.loadUserData();
    this.setState({ isRefreshing: false });
  };
  handleAddContact = ({ type }) => {
    this.props.navigation.navigate("EditContact", {
      type,
      user: this.state.user
    });
  };
  handleEditContact = ({ contact }) => {
    this.props.navigation.navigate("EditContact", {
      contact,
      user: this.state.user
    });
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

    const contactsByType = groupBy(user.contacts.items, "type");
    if (isParent && !contactsByType.kid) return null;
    if (!isParent && !contactsByType.parent && !contactsByType.friend)
      return null;

    return (
      <View>
        <AddContactActions
          isParent={isParent}
          handleAddContact={this.handleAddContact}
          appearance="ghost"
        />
        {isParent ? (
          <View style={styles.contactsSection}>
            <Text style={styles.contactsHeader} appearance="hint" category="h6">
              Your {contactsByType.kid.length > 1 ? " kids" : " kid"}
            </Text>
            {contactsByType.kid.map(this.renderContact)}
          </View>
        ) : (
          <React.Fragment>
            {contactsByType.parent && (
              <View style={styles.contactsSection}>
                <Text
                  style={styles.contactsHeader}
                  appearance="hint"
                  category="h6"
                >
                  Your{" "}
                  {contactsByType.parent.length > 1
                    ? " loving guardians"
                    : " loving guardian"}
                </Text>
                {contactsByType.parent.map(this.renderContact)}
              </View>
            )}
            {contactsByType.friend && (
              <View style={styles.contactsSection}>
                <Text
                  style={styles.contactsHeader}
                  appearance="hint"
                  category="h6"
                >
                  Your {contactsByType.parent.length > 1 ? "friends" : "friend"}
                </Text>
                {contactsByType.friend.map(this.renderContact)}
              </View>
            )}
          </React.Fragment>
        )}
      </View>
    );
  };
  render() {
    const { generalErrorMessage, user, userLoaded, isRefreshing } = this.state;

    return (
      <Layout style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          {generalErrorMessage && (
            <Text status="danger" style={styles.generalErrorMessage}>
              {generalErrorMessage}
            </Text>
          )}
          <Text category="h4" style={styles.header}>
            This is your village
          </Text>
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
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: gutterWidth
  },
  header: {
    marginBottom: 10,
    fontWeight: "normal"
  },
  generalErrorMessage: {
    marginVertical: 20
  },
  contactsContainer: { paddingVertical: 0 },
  contactsSection: {
    marginVertical: 10
  },
  contact: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    marginVertical: 10
  },
  contactsHeader: {},
  contactName: { fontWeight: "bold" },
  contactPhone: { color: textLinkColor, marginVertical: 5 },
  addContactActions: {
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  addContactButton: { marginVertical: 10 },
  addContactButtonText: { textTransform: "uppercase" },
  emptyStateIntroText: { marginTop: 20, fontWeight: "normal" }
});

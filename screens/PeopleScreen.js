import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  Icon,
  Layout,
  Text,
  Radio,
  Card,
  CardHeader,
  List,
  ListItem,
  Spinner
} from "@ui-kitten/components";
import { groupBy } from "lodash";
import Form from "../components/Form";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { Linking } from "expo";
import { getCurrentUser } from "../utils/api";
import { formatPhone } from "../utils/etc";
import { gutterWidth, colors } from "../utils/style";

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
      "willFocus",
      this.loadUserData
    );
  };
  componentWillUnmount() {
    this.loadUserDataSubcription.remove();
  }
  loadUserData = async () => {
    this.setState({ error: null });
    const { user, error: currentUserError } = await getCurrentUser();
    if (currentUserError)
      return this.setState({
        error: `Error: ${currentUserError}`
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

  renderItem = ({ item: contact, index }) => {
    let { firstName, lastName, phone, isParent } = contact;
    const description = "";
    //            <Text style={styles.listItemDescription}>{description}</Text>

    return (
      <View>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.contactName}>
              {firstName} {lastName}
            </Text>
            <Button
              appearance="ghost"
              inline={true}
              style={styles.contactPhone}
              onPress={() => this.handlePhonePress({ phone })}
            >
              {formatPhone(phone)}
            </Button>
          </View>
          <Button
            appearance="ghost"
            onPress={() => this.handleEditContact({ contact })}
          >
            Edit
          </Button>
        </View>
      </View>
    );
  };

  renderListForContacts = contacts => (
    <FlatList
      style={styles.list}
      renderItem={this.renderItem}
      data={contacts}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
    />
  );

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
          appearance="outline"
        />
        {isParent ? (
          <View style={styles.contactsSection}>
            <Text style={styles.contactsSectionHeader}>
              Your {contactsByType.kid.length > 1 ? " kids" : " kid"}
            </Text>
            {this.renderListForContacts(contactsByType.kid)}
          </View>
        ) : (
          <React.Fragment>
            {contactsByType.parent && (
              <View style={styles.contactsSection}>
                <Text style={styles.contactsSectionHeader}>
                  Your{" "}
                  {contactsByType.parent.length > 1
                    ? " loving guardians"
                    : " loving guardian"}
                </Text>
                {this.renderListForContacts(contactsByType.parent)}
              </View>
            )}
            {contactsByType.friend && (
              <View style={styles.contactsSection}>
                <Text style={styles.contactsSectionHeader}>
                  Your {contactsByType.friend.length > 1 ? "friends" : "friend"}
                </Text>
                {this.renderListForContacts(contactsByType.friend)}
              </View>
            )}
          </React.Fragment>
        )}
      </View>
    );
  };
  render() {
    const { error, user, userLoaded, isRefreshing } = this.state;

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
          {error && (
            <Text status="danger" style={styles.error}>
              {error}
            </Text>
          )}
          <Text style={styles.header}>This is your village</Text>
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
    paddingHorizontal: gutterWidth
  },
  header: {
    paddingVertical: 16,
    fontSize: 28,
    fontWeight: "normal",
    textTransform: "uppercase",
    textAlign: "center",
    color: colors.brandColor
  },
  // header: {
  //   marginBottom: 10,
  //   fontWeight: "normal"
  // },
  error: {
    marginVertical: 24
  },
  contactsContainer: { paddingVertical: 0 },
  contactsSection: {
    marginBottom: 16
  },
  contactsSectionHeader: {
    color: "#aaa",
    fontSize: 15,
    textTransform: "uppercase",
    marginTop: 16,
    marginBottom: 8
  },
  list: {
    // marginVertical: 20
  },
  listItem: {
    // marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listItemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.brandColor,
    marginVertical: 8
  },
  // listItemTitle: { color: colors.brandColor },
  // listItemDescription: {},
  // contact: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: "#aaa",
  //   marginVertical: 10
  // },
  // contactsHeader: {},
  contactName: { fontWeight: "bold", fontSize: 16 },
  // contactPhone: { marginVertical: 2 },
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

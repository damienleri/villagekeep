import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  SectionList,
  TouchableOpacity,
  Modal
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
  Spinner,
  TabView,
  TabBar,
  Tab
} from "@ui-kitten/components";
import { groupBy } from "lodash";
import Form from "../components/Form";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import { Linking } from "expo";
import { getCurrentUser, createContact } from "../utils/api";
import { formatPhone } from "../utils/etc";
import { gutterWidth, colors } from "../utils/style";
import { setSettings as setSettingsType } from "../redux/actions";
import AddContactActions from "../components/AddContactActions";
import ContactsEmptyState from "../components/ContactsEmptyState";
import { NetworkContext } from "../components/NetworkProvider";

class PeopleScreen extends React.Component {
  static contextType = NetworkContext;
  state = { modalIsVisible: false };
  componentDidMount = async () => {
    this.screenFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      this.loadUserData
    );
  };
  componentWillUnmount() {
    this.screenFocusSubscription.remove();
  }

  loadUserData = async () => {
    const { settings = {}, setSettings } = this.props;
    this.setState({ error: null });
    if (!this.context.isConnected) return;
    const { user, error } = await getCurrentUser();
    if (error) this.setState({ error });
    if (user) {
      setSettings({ user });
      this.generateSuggestedContacts();
    }
  };
  handleRefresh = async () => {
    this.setState({ isRefreshing: true });
    await this.loadUserData();
    this.setState({ isRefreshing: false });
  };
  handleAddContact = ({ type }) => {
    const { settings = {} } = this.props;
    const { user } = settings;
    this.props.navigation.navigate("EditContact", {
      type,
      user
    });
  };
  handleEditContact = ({ contact }) => {
    const { settings = {} } = this.props;
    const { user } = settings;
    this.props.navigation.navigate("EditContact", {
      contact,
      user
    });
  };

  handlePhonePress = ({ phone }) => {
    Linking.openURL(`tel:${phone}`);
  };

  renderCurrentContacts = () => {
    const { settings = {} } = this.props;
    const { user } = settings;
    const { isParent } = user;
    const { isRefreshing } = this.state;
    const contactsByType = groupBy(user.contacts.items, "type");
    if (isParent && !contactsByType.kid) return null;
    if (!isParent && !contactsByType.parent && !contactsByType.friend)
      return null;

    let sections = [];

    if (isParent) {
      if (contactsByType.kid)
        sections.push({
          data: contactsByType.kid,
          singular: "kid",
          plural: "kids"
        });
    } else {
      if (contactsByType.parent)
        sections.push({
          data: contactsByType.parent,
          singular: "guardian",
          plural: "guardians"
        });
      if (contactsByType.friend)
        sections.push({
          data: contactsByType.friend,
          singular: "friend",
          plural: "friends"
        });
    }

    return (
      <SectionList
        style={styles.list}
        sections={sections}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ListHeaderComponent={
          <AddContactActions
            isParent={isParent}
            handleAddContact={this.handleAddContact}
            appearance="outline"
          />
        }
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this.handleRefresh}
          />
        }
      />
    );
  };

  renderItem = ({ item: contact, index }) => {
    let { firstName, lastName, phone, isParent } = contact;
    const description = "";
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

  renderSectionHeader = ({ section: { data, singular, plural } }) => {
    return (
      <Text style={styles.contactsSectionHeader}>
        Your {data.length > 1 ? plural : singular}
      </Text>
    );
  };

  generateSuggestedContacts = () => {
    const { settings = {} } = this.props;
    const { user } = settings;
    const contactsWithMyPhone = user.contactsByPhone.items;
    let suggestedContacts = [];

    for (const contact of contactsWithMyPhone) {
      const { firstName, lastName, phone, id: userId } = contact.user;
      if (user.contacts.items.findIndex(c => c.phone === phone) >= 0) continue; // already in my contacts
      const type =
        contact.type === "kid"
          ? "parent"
          : contact.type === "parent"
          ? "kid"
          : contact.type;
      suggestedContacts.push({
        type,
        firstName,
        lastName,
        userId,
        phone,
        isReciprocal: true
      });
    }
    this.setState({ suggestedContacts });
  };

  acceptSuggestedContact = async item => {
    const { type, firstName, lastName, userId, phone, isReciprocal } = item;
    const { settings = {} } = this.props;
    const { user } = settings;

    this.setState({
      error: null,
      accepting: { ...this.state.accepting, [phone]: true }
    });
    const { contact, error } = await createContact({
      user,
      firstName,
      lastName,
      phone,
      type
    });

    if (error) {
      this.setState({
        error,
        accepting: { ...this.state.accepting, [phone]: false }
      });
      return;
    }

    await this.setState({
      accepting: { ...this.state.accepting, [phone]: false },
      accepted: { ...this.state.accepted, [phone]: true }
    });
  };

  renderSuggestedContact = ({ item }) => {
    const { type, firstName, lastName, userId, phone, isReciprocal } = item;
    const { accepting = {}, accepted = {} } = this.state;
    return (
      <View>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.contactName}>
              {firstName} {lastName}
            </Text>
            <Text>{formatPhone(phone)}</Text>
          </View>
          {accepted[phone] ? (
            <Icon
              fill="green"
              height={24}
              width={24}
              animation="zoom"
              name="checkmark-outline"
            />
          ) : (
            <Button
              appearance="ghost"
              inline={true}
              onPress={() => this.acceptSuggestedContact(item)}
            >
              {accepting[phone] ? "Adding..." : "Add contact"}
            </Button>
          )}
        </View>
      </View>
    );
  };

  toggleModal = () => {
    this.setState({ modalIsVisible: !this.state.modalIsVisible });
    this.loadUserData();
  };

  renderModal = () => {
    return (
      <Layout style={styles.modalContainer}>
        <Text category="h4">Suggestions</Text>
        <View style={styles.tabContent}>{this.renderSuggestedContacts()}</View>
        <Button appearance="outline" onPress={this.toggleModal}>
          Close
        </Button>
      </Layout>
    );
  };

  renderSuggestedContacts = () => {
    const { suggestedContacts } = this.state;
    if (!suggestedContacts) return <Spinner />;

    if (!suggestedContacts.length) return <Text>You have no suggestions.</Text>;

    return (
      <View style={styles.contactsSection}>
        <Text style={styles.introText}>
          These are people who added you as a contact. With one click you can
          return the favor to each of them.
        </Text>
        <FlatList
          style={styles.list}
          renderItem={this.renderSuggestedContact}
          data={suggestedContacts}
          keyExtractor={item => item.phone}
          ItemSeparatorComponent={() => (
            <View style={styles.listItemSeparator} />
          )}
        />
      </View>
    );
  };

  render() {
    const { settings = {} } = this.props;
    const { user } = settings;

    const {
      error,
      modalIsVisible,
      tabIndex = 0,
      suggestedContacts = []
    } = this.state;

    return (
      <Layout style={styles.container}>
        {error && (
          <Text status="danger" style={styles.error}>
            {error}
          </Text>
        )}
        {!user ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {suggestedContacts.length > 0 && (
              <Button appearance="primary" onPress={this.toggleModal}>
                View {suggestedContacts.length} suggested{" "}
                {suggestedContacts.length > 1 ? "contacts" : "contact"}
              </Button>
            )}

            {this.renderCurrentContacts() || (
              <ContactsEmptyState
                isParent={user.isParent}
                handleAddContact={this.handleAddContact}
              />
            )}
          </React.Fragment>
        )}

        {user && (
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsVisible}
            onRequestClose={this.toggleModal}
          >
            {this.renderModal()}
          </Modal>
        )}
      </Layout>
    );
  }
}

export default connect(({ settings }) => ({ settings }), {
  setSettings: setSettingsType
})(PeopleScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: gutterWidth,
    flex: 1
  },
  error: {
    marginVertical: 24
  },
  introText: {
    marginVertical: 24,
    fontSize: 18,
    lineHeight: 22
  },
  dismissableMessage: {
    fontSize: 18,
    lineHeight: 22
  },
  tabContent: {
    paddingVertical: 32
  },
  contactsSection: {
    marginBottom: 24
  },
  contactsSectionHeader: {
    color: "#aaa",
    fontSize: 17,
    textTransform: "uppercase",
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "600"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listItemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.brandColor,
    marginVertical: 8
  },
  contactName: { fontWeight: "bold", fontSize: 16 },
  modalContainer: {
    flex: 1,
    paddingHorizontal: gutterWidth,
    paddingTop: 50
  }
});

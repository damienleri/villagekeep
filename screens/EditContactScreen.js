import React from "react";
import { StyleSheet, View, Alert, Modal, FlatList } from "react-native";
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
  CheckBox
} from "@ui-kitten/components";
import { sortBy } from "lodash";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import * as Contacts from "expo-contacts";
import Button from "../components/Button";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import TopNavigation from "../components/TopNavigation";
import {
  getCurrentUser,
  createContact,
  updateContact,
  deleteContact
} from "../utils/api";
import { formatPhone } from "../utils/etc";
import { colors, gutterWidth } from "../utils/style";
import { sendInvitationToContactsByDefault } from "../utils/constants";

export default class EditContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.firstNameInputRef = React.createRef();
    const contact = props.navigation.getParam("contact");
    if (contact) {
      /* Update mode */
      this.state = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: formatPhone(contact.phone),
        sendInvitation: contact.sendInvitation,
        validPhone: contact ? contact.phone : null,
        addressBookModalIsVisible: false
      };
    } else {
      /* Create mode */
      this.state = {
        firstName: "",
        lastName: "",
        phone: "",
        sendInvitation: sendInvitationToContactsByDefault,
        validPhone: null,
        addressBookModalIsVisible: false
      };
    }
  }

  componentDidMount() {
    const contact = this.props.navigation.getParam("contact");
    if (!contact) this.firstNameInputRef.current.focus();
  }

  handleChangePhone = async text => {
    const contact = this.props.navigation.getParam("contact");
    const user = this.props.navigation.getParam("user");
    const parsed = parsePhoneNumberFromString(text, "US");
    const isValidPhone = !!parsed && parsed.isValid();
    const isBackspace = text.length < this.state.phone.length;
    const phone = isBackspace ? text : new AsYouType("US").input(text);
    let validPhone = isValidPhone ? parsed.format("E.164") : null;
    let phoneErrorMessage = null;
    if (
      !contact &&
      validPhone &&
      user.contacts.items.findIndex(c => c.phone === validPhone) >= 0
    ) {
      phoneErrorMessage = "That number is already in your contacts list.";
      validPhone = null;
    }
    this.setState({
      phone,
      validPhone,
      phoneErrorMessage
    });
  };

  handleSubmit = async () => {
    const { firstName, lastName, validPhone, sendInvitation } = this.state;
    const contact = this.props.navigation.getParam("contact");
    const type = this.props.navigation.getParam("type");
    const user = this.props.navigation.getParam("user");
    this.setState({ isSubmitting: true });
    if (contact) {
      /* Update mode */
      console.log("updating contact id", contact.id);
      const {
        contact: updatedContact,
        error: updateContactError
      } = await updateContact({
        id: contact.id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: validPhone
      });
      if (updateContactError) {
        this.setState({
          error: updateContactError,
          isSubmitting: false
        });
        return;
      }
      console.log("updated contact", updatedContact);
    } else {
      /* Create mode */
      const { contact, error: createContactError } = await createContact({
        user,
        firstName,
        lastName,
        phone: validPhone,
        type,
        sendInvitation
      });
      if (createContactError) {
        this.setState({
          error: createContactError,
          isSubmitting: false
        });
        return;
      }
    }
    this.props.navigation.goBack();
  };

  handleDelete = async () => {
    const contact = this.props.navigation.getParam("contact");
    const { error } = await deleteContact({
      contactId: contact.id
    });
    if (error) return this.setState({ error });
    this.props.navigation.goBack();
  };

  handleDeletePress = () => {
    Alert.alert(
      "Delete this contact?",
      "",
      [
        { text: "Delete", onPress: this.handleDelete, style: "destructive" },
        {
          text: "Nevermind",
          onPress: () => {},
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  handleAddressBookClick = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();
      this.setState({ addressBookData: data, addressBookModalIsVisible: true });
    }
  };

  acceptSuggestedContact = async item => {
    const { firstName, lastName, phone, id, sendInvitation } = item;
    const type = this.props.navigation.getParam("type");
    const user = this.props.navigation.getParam("user");

    this.setState({
      error: null,
      accepting: { ...this.state.accepting, [id]: true }
    });

    const { contact, error } = await createContact({
      user,
      firstName,
      lastName,
      phone,
      type,
      sendInvitation
    });

    if (error) {
      this.setState({
        error,
        accepting: { ...this.state.accepting, [id]: false }
      });
      return;
    }

    await this.setState({
      accepting: { ...this.state.accepting, [id]: false },
      accepted: { ...this.state.accepted, [id]: true }
    });
  };

  renderAddressBookItem = ({ item }) => {
    const { firstName, lastName, phone, sendInvitation, id, wasAdded } = item;
    const { accepting = {}, accepted = {} } = this.state;
    return (
      <View style={styles.listItem}>
        <View>
          <Text style={styles.contactName}>
            {firstName} {lastName}
          </Text>
          <Text>{formatPhone(phone)}</Text>
        </View>
        {wasAdded ? (
          <Text>Added</Text>
        ) : accepted[id] ? (
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
            {accepting[id] ? "Adding..." : "Add"}
          </Button>
        )}
      </View>
    );
  };

  renderAddressBookList = () => {
    const { addressBookData, sendInvitation } = this.state;
    const user = this.props.navigation.getParam("user");
    if (!addressBookData) return <Spinner />;
    let filtered = [];

    for (const row of addressBookData) {
      let phone;
      if (row.phoneNumbers) {
        const entry =
          row.phoneNumbers.find(
            p => p.label && p.label.toLowerCase() === "mobile"
          ) || row.phoneNumbers[0];
        if (entry) {
          const parsed = parsePhoneNumberFromString(entry.number, "US");
          if (parsed && parsed.isValid()) {
            // This library also checks validity of area code and such, so it
            // skips most of the dummy contacts in the iOS simulator
            phone = parsed.format("E.164");
          }
        }
      }
      if (!phone) continue;
      const wasAdded = !!user.contacts.items.find(c => c.phone === phone);
      const id = row.id;
      let firstName = row.firstName;
      let lastName = row.lastName;
      if (!firstName && !lastName) {
        if (row.name) {
          firstName = row.name;
        }
        if (!firstName) continue;
      }
      filtered.push({
        id,
        phone,
        firstName,
        lastName,
        wasAdded,
        sendInvitation
      });
    }

    const sorted = sortBy(filtered, c =>
      c.firstName
        ? [c.firstName.toLowerCase(), (c.lastName || "").toLowerCase()]
        : (c.lastName || "").toLowerCase()
    );
    return (
      <View style={styles.contactsSection}>
        <Text style={styles.introText}></Text>
        <FlatList
          style={styles.list}
          renderItem={this.renderAddressBookItem}
          data={sorted}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.listItemSeparator} />
          )}
          ListHeaderComponent={this.renderListHeader}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={<Text>No contacts found.</Text>}
        />
      </View>
    );
  };

  renderListHeader = () => {
    const { closingAddressModal } = this.state;
    return (
      <View style={styles.listHeader}>
        <Button
          appearance="primary"
          onPress={this.closeAddressBookModal}
          disabled={closingAddressModal}
        >
          {closingAddressModal ? "Closing..." : "Close"}
        </Button>
      </View>
    );
  };

  renderAddressBookModal = () => {
    const { sendInvitation } = this.state;
    return (
      <Layout style={styles.modalContainer}>
        <Text category="h4">Choose Contacts</Text>
        <CheckBox
          style={styles.sendInvitationCheckboxInModal}
          checked={sendInvitation}
          text="Send a text invitation to the Village Keep app"
          onChange={sendInvitation => {
            this.setState({ sendInvitation });
          }}
        />
        <View>{this.renderAddressBookList()}</View>
      </Layout>
    );
  };
  closeAddressBookModal = async () => {
    this.setState({ closingAddressModal: true });
    this.props.navigation.navigate("People");
  };

  render() {
    const { navigation } = this.props;
    const {
      error,
      firstName,
      lastName,
      phone,
      isSubmitting,
      phoneErrorMessage,
      validPhone,
      addressBookModalIsVisible,
      sendInvitation
    } = this.state;
    const contact = navigation.getParam("contact");
    const user = navigation.getParam("user");
    const { isParent } = user;
    const type = contact ? contact.type : navigation.getParam("type");

    return (
      <Layout style={styles.container}>
        {!contact && (
          <View style={styles.intro}>
            <View>
              <Text style={styles.header}>Select from your phone:</Text>
              <Button
                onPress={this.handleAddressBookClick}
                appearance="outline"
              >
                Open address book
              </Button>
            </View>
            <Text style={styles.header}>
              Or add a single {type === "parent" ? "parent/guardian" : type}:
            </Text>
          </View>
        )}

        <Form>
          <FormInput
            label="First name"
            placeholder=""
            onChangeText={firstName =>
              this.setState({ firstName, error: false })
            }
            value={firstName}
            returnKeyType="done"
            autoCorrect={false}
            ref={this.firstNameInputRef}
          />
          <FormInput
            label="Last name"
            placeholder=""
            onChangeText={lastName => this.setState({ lastName, error: false })}
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
                : phoneErrorMessage || !validPhone
                ? "danger"
                : "success"
            }
            caption={phoneErrorMessage}
            keyboardType={"phone-pad"}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {error && (
            <Text style={styles.error} status="danger">
              {error}
            </Text>
          )}
          <CheckBox
            style={styles.sendInvitationCheckbox}
            checked={sendInvitation}
            text="Send a text invitation to the Village Keep app"
            onChange={sendInvitation => {
              this.setState({ sendInvitation });
            }}
          />
          <FormSubmitButton
            onPress={this.handleSubmit}
            disabled={!firstName || !lastName || !validPhone || isSubmitting}
          >
            {isSubmitting ? "Saving contact" : "Save"}
          </FormSubmitButton>

          {contact && (
            <Button
              style={styles.deleteButton}
              appearance="ghost"
              status="danger"
              onPress={this.handleDeletePress}
            >
              Delete
            </Button>
          )}
        </Form>
        <Modal
          animationType="slide"
          transparent={false}
          visible={addressBookModalIsVisible}
          onRequestClose={this.closeAddressBookModal}
        >
          {this.renderAddressBookModal()}
        </Modal>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: { marginHorizontal: gutterWidth },
  header: { marginTop: 20, marginBottom: 10, fontWeight: "normal" },
  introText: { marginBottom: 10 },
  deleteButton: { marginTop: 20 },
  error: {
    marginTop: 4,
    marginBottom: 8,
    textAlign: "center"
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: gutterWidth,
    paddingTop: 50
  },
  list: { marginBottom: 40 },
  listHeader: {
    paddingBottom: 20
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
  sendInvitationCheckboxInModal: {
    marginTop: 20
  },
  sendInvitationCheckbox: {
    marginTop: 5,
    marginBottom: 15
  }
});

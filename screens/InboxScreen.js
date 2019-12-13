import React from "react";
import { connect } from "react-redux";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import {} from "react-navigation";
import {
  Layout,
  List,
  ListItem,
  Card,
  Text,
  Toggle,
  Icon
} from "@ui-kitten/components";

import { gutterWidth } from "../utils/style";
import Button from "../components/Button";
import BuildInfo from "../components/BuildInfo";
import { NetworkContext } from "../components/NetworkProvider";
import { setSettings as setSettingsType } from "../redux/actions";
import { getCurrentUser, updateUser } from "../utils/api";
import { colors } from "../utils/style";

class InboxScreen extends React.Component {
  static contextType = NetworkContext;
  state = {};

  componentDidMount() {
    this.loadUserDataSubcription = this.props.navigation.addListener(
      "willFocus",
      this.loadUserData
    );
  }
  componentWillUnmount() {
    this.loadUserDataSubcription.remove();
  }

  loadUserData = async () => {
    this.setState({ error: null });
    const { settings = {}, setSettings } = this.props;

    if (this.context.isConnected) {
      const { user, error } = await getCurrentUser();
      if (user) {
        setSettings({ user });
        this.generateSuggestedContacts();
      }
      if (error) this.setState({ error });
    }
  };

  generateSuggestedContacts = () => {
    const { settings = {} } = this.props;
    const { user } = settings;
    const contactsWithMyPhone = user.contactsByPhone.items;
    let suggestedContacts = [];
    for (const contact of contactsWithMyPhone) {
      const { firstName, lastName, phone, id: userId } = contact.user;
      if (user.contacts.items.indexOf(phone) >= 0) continue; // already in my contacts
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
    this.setState({ error: null });

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
        isSubmitting: false
      });
      return;
    }
    console.log("created contact", contact);
  };
  dismissSuggestedContact = item => {
    const { type, firstName, lastName, userId, phone, isReciprocal } = item;
  };

  renderSuggestedContact = ({ item }) => {
    const { type, firstName, lastName, userId, phone, isReciprocal } = item;
    return (
      <View>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.contactName}>
              {firstName} {lastName}
            </Text>
            <Text>{formatPhone(phone)}</Text>
          </View>
          <Button
            appearance="ghost"
            inline={true}
            onPress={() => this.acceptSuggestedContact(item)}
          >
            Accept
          </Button>
          <Button
            appearance="ghost"
            status="basic"
            onPress={() => this.dismissSuggestedContact(item)}
            icon={style => <Icon {...style} name="close-outline" />}
          />
        </View>
      </View>
    );
  };

  renderSuggestedContacts = () => {
    const { suggestedContacts } = this.state;

    if (!suggestedContacts || !suggestedContacts.length) return null;
    return (
      <View style={styles.contactsSection}>
        <Text style={styles.contactsSectionHeader}>
          People who added you already
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
    const { settings, setSettings } = this.props;
    const { theme, user = {} } = settings;
    const { error } = this.state;
    return (
      <Layout style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        {error && <Text status="danger">{error}</Text>}
        <View style={styles.content}>{this.renderSuggestedContacts()}</View>}{" "}
      </Layout>
    );
  }
}

export default connect(
  ({ settings }) => ({ settings }),
  { setSettings: setSettingsType }
)(InboxScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: gutterWidth
  },
  header: {
    paddingVertical: 18,
    fontSize: 28,
    fontWeight: "normal",
    textTransform: "uppercase",
    textAlign: "center",
    color: colors.brandColor
  },
  content: {
    marginVertical: 24
  },
  listItem: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listItemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.brandColor,
    marginVertical: 10
  },
  listItemTitle: { color: colors.brandColor },
  listItemDescription: {},
  buttonRow: { marginVertical: 20 },
  toggleRow: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  devItem: {}
});

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, ListItem } from "react-native-elements";
import API, { graphqlOperation } from "@aws-amplify/api";
import { Auth } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import {
  getCurrentUser,
  createCurrentUser,
  createContact,
  getContacts
} from "../utils/api";

import * as queries from "../graphql/queries";

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: "Contacts"
  };

  addContact = async ({ type }) => {
    const phone = "+12678086023";
    const firstName = "Dale";
    const lastName = "Cooper";
    const { error, contact } = await createContact({
      type,
      phone,
      firstName,
      lastName
    });
    console.log(contact);
  };
  addUser = async () => {
    const { error, user } = await createCurrentUser({
      firstName: "The Real Dale",
      lastName: "Cooper",
      isParent: true
    });
    console.log(user);
  };

  listContacts = async () => {
    const { user, error } = await getCurrentUser();
    if (error) console.log(`error from getCurrentUser: ${error}`);
    // console.log("all contacts", await getContacts());
    console.log("my contacts", user.contacts.items.length);
  };
  listUsers = async () => {
    try {
      const res = await API.graphql(graphqlOperation(queries.listUsers));
      console.log("list users response", res.data.listUsers.items);
    } catch (e) {
      console.log("error listing users", e);
    }
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Button title="Add User" onPress={() => this.addUser()} />
        <Button
          title="Add a Kid"
          onPress={() => this.addContact({ type: "kid" })}
        />
        <Button title="List contacts" onPress={() => this.listContacts()} />
        <Button title="List users" onPress={() => this.listUsers()} />
        <Button
          title="Sign up"
          onPress={() => this.props.navigation.navigate("AuthSignUp")}
        />
        <Button
          title="Sign in"
          onPress={() => this.props.navigation.navigate("AuthSignIn")}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

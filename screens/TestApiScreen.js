import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Button } from "@ui-kitten/components";
import API, { graphqlOperation } from "@aws-amplify/api";
import { Auth } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import {
  getCurrentUser,
  createCurrentUser,
  createContact,
  getContacts,
  deleteCurrentUser
} from "../utils/api";

import * as queries from "../graphql/queries";

export default class TestApiScreen extends React.Component {
  static navigationOptions = {
    title: "Contacts"
  };
  //
  // addContact = async ({ type }) => {
  //   const phone = "+12678086023";
  //   const firstName = "Dale";
  //   const lastName = "Cooper";
  //   const { error, contact } = await createContact({
  //     type,
  //     phone,
  //     firstName,
  //     lastName
  //   });
  //   console.log(contact);
  // };
  addUser = async () => {
    const { error, user } = await createCurrentUser();
    console.log(user);
  };

  listContacts = async () => {
    const { user, error } = await getCurrentUser();
    if (error) console.log(`error from getCurrentUser: ${error}`);
    console.log("all contacts", await getContacts());
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

  deleteUser = async () => {
    await deleteCurrentUser();
    return this.props.navigation.navigate("AuthVerify", {
      phone: "+12678086023",
      password: "testtest1"
    });
  };

  render() {
    // <Button onPress={() => this.addContact({ type: "kid" })}>
    //   Add a kid
    // </Button>

    return (
      <Layout style={styles.container}>
        <Button onPress={this.addUser}>Add User</Button>
        <Button onPress={this.listContacts}>List contacts</Button>
        <Button onPress={this.listUsers}>List users</Button>
        <Button onPress={this.deleteUser}>Delete current user</Button>
        <Button onPress={() => this.props.navigation.navigate("Welcome")}>
          Welcome screen
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});

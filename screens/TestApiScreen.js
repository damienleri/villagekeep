import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, ListItem } from "react-native-elements";
import API, { graphqlOperation } from "@aws-amplify/api";
import { Auth } from "aws-amplify";
import { createContact, createUser } from "../graphql/mutations";
import { listContacts, listUsers } from "../graphql/queries";

// const createContact = `mutation CreateContact($type: String!, $phone: AWSPhone!, $firstName: String, $lastName: String) {
//   createContact(input: {type: $type, phone: $phone, firstName: $firstName, lastName: $lastName}) {
//     type
//   }
// }
// `;

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: "Contacts"
  };
  addContact = async ({ type }) => {
    console.log(`Adding ${type} contact`);

    const contact = {
      type,
      phone: "+12678086023",
      firstName: "Dale",
      lastName: "Cooper"
      //user todo
    };
    // const contact = {
    //   type,
    //   phone: "267-808-6023",
    //   firstName: "Dale",
    //   lastName: "Cooper"
    //   //user todo
    // };
    try {
      const res = await API.graphql(
        graphqlOperation(createContact, { input: contact })
      );
      console.log("createcontact response", res);
    } catch (e) {
      console.log("error creating contact", e);
    }
  };
  addUser = async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    console.log(cognitoUser.attributes);
    const { sub: cognitoUserId, phone_number: phone } = cognitoUser.attributes;
    console.log(`Adding user with cognito id ${cognitoUserId} (${phone})`);

    const user = {
      phone,
      firstName: "Dale from user",
      lastName: "Cooper",
      isParent: true
    };

    try {
      const res = await API.graphql(
        graphqlOperation(createUser, { input: user })
      );
      console.log("createuser response", res);
    } catch (e) {
      console.log("error creating user", e);
    }
  };

  listContacts = async () => {
    try {
      const res = await API.graphql(graphqlOperation(listContacts));
      console.log("listContacts response", res);
    } catch (e) {
      console.log("error listing contacts", e);
    }
  };
  listUsers = async () => {
    try {
      const res = await API.graphql(graphqlOperation(listUsers));
      console.log("list users response", res);
    } catch (e) {
      console.log("error listing users", e);
    }
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          title="Add a Kid"
          onPress={() => this.addContact({ type: "kid" })}
        />
        <Button title="Add User" onPress={() => this.addUser()} />
        <Button title="List contacts" onPress={() => this.listContacts()} />
        <Button title="List users" onPress={() => this.listUsers()} />
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

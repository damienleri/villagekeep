import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, ListItem } from "react-native-elements";
import API, { graphqlOperation } from "@aws-amplify/api";
import { createContact } from "../graphql/mutations";

// const createContact = `mutation CreateContact($type: String!, $phone: AWSPhone!, $firstName: String, $lastName: String) {
//   createContact(input: {type: $type, phone: $phone, firstName: $firstName, lastName: $lastName}) {
//     id
//   }
// }
// `;

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: "Contacts"
  };
  addContact = async ({ type }) => {
    console.log(`Adding contact`);

    const contact = {
      type,
      phone: "267-808-6023",
      firstName: "Dale",
      lastName: "Cooper"
      //user todo
    };
    const res = await API.graphql(
      graphqlOperation(createContact, { input: contact })
    );
    console.log("res", res);
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          title="Add a Kid"
          onPress={() => this.addContact({ type: "kid" })}
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

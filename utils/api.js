import { Auth } from "aws-amplify";
import API, { graphqlOperation } from "@aws-amplify/api";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export const getCurrentUser = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  if (!cognitoUser) return { error: "Not logged in" };
  const cognitoUserId = cognitoUser.attributes.sub;
  try {
    const res = await API.graphql(
      graphqlOperation(queries.userByCognitoUserId, { cognitoUserId })
    );
    console.log("returning user", res.data.userByCognitoUserId.items[0]);
    return { cognitoUser, user: res.data.userByCognitoUserId.items[0] };
  } catch (e) {
    return { error: `Error getting current login: ${e}` };
  }
};

export const createCurrentUser = async ({ firstName, lastName, isParent }) => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  console.log(cognitoUser.attributes);
  const { sub: cognitoUserId, phone_number: phone } = cognitoUser.attributes;
  console.log(`Adding user with cognito id ${cognitoUserId} (${phone})`);
  const user = {
    cognitoUserId,
    phone,
    firstName,
    lastName,
    isParent
  };

  try {
    const res = await API.graphql(
      graphqlOperation(mutations.createUser, { input: user })
    );
    return { cognitoUser, user: res.data.createUser };
  } catch (e) {
    return { error: `Error saving user record: ${e}` };
  }
};

export const createContact = async ({ type, phone, firstName, lastName }) => {
  const { user: currentUser } = await getCurrentUser();
  if (!currentUser) {
    return { error: "Can't find current user" };
  }
  console.log(`Adding ${type} contact owned by user:`, currentUser);
  const contactInput = {
    type,
    phone,
    firstName,
    lastName,
    contactUserId: currentUser.id
  };
  let contact = null;
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.createContact, { input: contactInput })
    );
    contact = res.data.createContact;
  } catch (e) {
    return { error: `Error saving contact record: ${e}` };
  }

  return { contact };

  let contacts = [];
  contacts.push(contact.id);
  console.log("saving contact ids:", contacts);
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id: currentUser.id, userContactID: contacts }
      })
    );
    console.log("result from updateUser", res.data.updateUser);
    return { contact };
  } catch (e) {
    console.log("error saving contact record", e);
    return { error: `Error saving contact record: ${e}` };
  }
};

export const getContacts = async () => {
  try {
    const res = await API.graphql(
      graphqlOperation(queries.listContacts)
      // graphqlOperation(queries.listContacts, { contactUserId: userId })
    );
    return res.data.listContacts.items;
  } catch (e) {
    return { error: `Error listing contacts: ${e}` };
  }
};
export const phoneNumberIsTaken = async phone => {
  return true;
  try {
    const res = await API.graphql(
      graphqlOperation(queries.getUserByPhone, { phone })
      // graphqlOperation(queries.listContacts, { contactUserId: userId })
    );
  } catch (e) {
    return { error: `Error checking phone uniquenuess: ${e}` };
  }
};

import { Auth } from "aws-amplify";
import API, { graphqlOperation } from "@aws-amplify/api";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export const getCurrentUser = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  if (!cognitoUser) return { error: "You are not logged in." };
  const cognitoUserId = cognitoUser.attributes.sub;
  try {
    console.log("getting user for ", cognitoUserId);
    const res = await API.graphql(
      graphqlOperation(queries.userByCognitoUserId, { cognitoUserId })
    );
    console.log("result", res);
    const user = res.data.userByCognitoUserId.items[0];
    if (!user)
      return {
        cognitoUser,
        error:
          "Your user account was not created. Please report this to tech support."
      };
    return { cognitoUser, user };
  } catch (e) {
    return { error: `Error getting current login: ${e}` };
  }
};

export const createCurrentUser = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  const { sub: cognitoUserId, phone_number: phone } = cognitoUser.attributes;
  console.log(`Adding user with cognito id ${cognitoUserId} (${phone})`);
  const user = {
    cognitoUserId,
    phone
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
  const { currentUser } = await getCurrentUser();
  if (!currentUser) {
    return { error: "Can't find current currentUser" };
  }
  console.log(`Adding ${type} contact owned by currentUser:`, currentUser);
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

  // let contacts = [];
  // contacts.push(contact.id);
  // console.log("saving contact ids:", contacts);
  // try {
  //   const res = await API.graphql(
  //     graphqlOperation(mutations.updateUser, {
  //       input: { id: currentUser.id, userContactID: contacts }
  //     })
  //   );
  //   console.log("result from updateUser", res.data.updateUser);
  //   return { contact };
  // } catch (e) {
  //   console.log("error saving contact record", e);
  //   return { error: `Error saving contact record: ${e}` };
  // }
};

export const updateUser = async input => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input
      })
    );
    const user = res.data.updateUser;
    return { user };
  } catch (e) {
    return { error: `Error updating account: ${e}` };
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

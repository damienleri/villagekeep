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
    console.log("userByCognitoUserId result", res);
    const user = res.data.userByCognitoUserId.items[0];
    if (!user) {
      console.log("No account found.");
      return {
        cognitoUser,
        error:
          "Your user account was not created. Please report this to tech support."
      };
    }
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
    return { error: `Error creating account: ${e}` };
  }
};
export const deleteCurrentUser = async () => {
  const { cognitoUser, user: currentUser } = await getCurrentUser();

  console.log(`Deleting user with id ${currentUser.id}`);

  const user = {
    id: currentUser.id
  };

  try {
    const res = await API.graphql(
      graphqlOperation(mutations.deleteUser, { input: user })
    );
    console.log("deleteuser response", res);
    console.log(`Deleting cognito user`);
    const cognitoRes = await cognitoUser.deleteUser();
    console.log("delete cognito response", cognitoRes);
    return {};
  } catch (e) {
    return { error: `Error deleting account: ${e}` };
  }
};

export const createContact = async ({ type, phone, firstName, lastName }) => {
  const { user: currentUser } = await getCurrentUser();
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

  try {
    const res = await API.graphql(
      graphqlOperation(mutations.createContact, { input: contactInput })
    );
    const contact = res.data.createContact;
    return { contact };
  } catch (e) {
    return { error: `Error saving contact record: ${e}` };
  }
};

export const updateContact = async contactInput => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.updateContact, { input: contactInput })
    );
    const contact = res.data.updateContact;
    return { contact };
  } catch (e) {
    return { error: `Error saving contact record: ${e}` };
  }
};

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

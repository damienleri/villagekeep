import { Auth } from "aws-amplify";
import API, { graphqlOperation } from "@aws-amplify/api";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export const getCurrentUser = async () => {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  if (!cognitoUser) return { error: "You are not logged in." };
  const cognitoUserId = cognitoUser.attributes.sub;
  try {
    // console.log("getting user for ", cognitoUserId);
    const res = await API.graphql(
      graphqlOperation(queries.userByCognitoUserId, { cognitoUserId })
    );
    // console.log("userByCognitoUserId result", res);
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
    console.log("error from auth", e);
    return { error: `Error getting current login: ${e.message}` };
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
    cognitoUser.deleteUser((err, res) => {
      console.log("delete cognito response", res, err);
    });

    return {};
  } catch (e) {
    return { error: `Error deleting account: ${e}` };
  }
};
// export const deleteContact = async ({ contactId }) => {
//   try {
//     const res = await API.graphql(
//       graphqlOperation(mutations.updateContact, {
//         input: { id: contactId, deletedAt: new Date().getTime() }
//       })
//     );
//     console.log("deleteuser response", res);
//     return {};
//   } catch (e) {
//     return { error: `Error deleting contact: ${e}` };
//   }
// };

export const createContact = async ({
  userId,
  type,
  phone,
  firstName,
  lastName
}) => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.createContact, {
        input: { type, phone, firstName, lastName, contactUserId: userId }
      })
    );
    return { contact: res.data.createContact };
  } catch (e) {
    return { error: `Error saving contact record: ${e}` };
  }
};

export const updateContact = async contactInput => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.updateContact, { input: contactInput })
    );
    return { contact: res.data.updateContact };
  } catch (e) {
    return { error: `Error saving contact record: ${e}` };
  }
};
export const deleteContact = async ({ contactId }) => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.deleteContact, {
        input: { id: contactId }
      })
    );
    return {};
  } catch (e) {
    return { error: `Error deleting contact: ${e}` };
  }
};

export const createEvent = async ({ title, userId }) => {
  try {
    // console.log(`createing event for user ${userId}`);
    const res = await API.graphql(
      graphqlOperation(mutations.createEvent, {
        input: {
          title,
          eventUserId: userId
        }
      })
    );
    return { event: res.data.createEvent };
  } catch (e) {
    return { error: `Error saving event record: ${e}` };
  }
};

export const updateEvent = async eventInput => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.updateEvent, { input: eventInput })
    );
    return { event: res.data.updateEvent };
  } catch (e) {
    return { error: `Error saving event record: ${e}` };
  }
};
export const deleteEvent = async ({ eventId }) => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.deleteEvent, {
        input: { id: eventId }
      })
    );
    return {};
  } catch (e) {
    return { error: `Error deleting event: ${e}` };
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

import { Auth } from "aws-amplify";
import API, { graphqlOperation } from "@aws-amplify/api";
import { differenceBy, get } from "lodash";
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
    return { error: `Error getting your account: ${e.errors.join(". ")}` };
  }
};

export const getMessagesForEvent = async event => {
  const messages = [{ text: "blah", id: "1" }, { text: "another te", id: "2" }];

  return { messages };
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

export const createMessage = async ({ text, event, user }) => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.createMessage, {
        input: {
          text,
          messageEventId: event.id,
          messageUserId: user.id,
          cognitoUserId: user.cognitoUserId
        }
      })
    );
    return { message: res.data.createMessage };
  } catch (e) {
    console.log(e);
    return { error: `Error saving message: ${e}` };
  }
};
export const createContact = async ({
  user,
  type,
  phone,
  firstName,
  lastName
}) => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.createContact, {
        input: {
          type,
          phone,
          firstName,
          lastName,
          contactUserId: user.id,
          cognitoUserId: user.cognitoUserId
        }
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
    console.log(e);
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
    console.log("deleted.");
    return {};
  } catch (e) {
    console.log(e);
    return { error: `Error deleting contact: ${e}` };
  }
};

export const createEvent = async ({ title, user }) => {
  try {
    // console.log(`createing event for user ${userId}`);
    const res = await API.graphql(
      graphqlOperation(mutations.createEvent, {
        input: {
          title,
          eventUserId: user.id,
          cognitoUserId: user.cognitoUserId
        }
      })
    );
    return { event: res.data.createEvent };
  } catch (e) {
    console.log(e);
    return { error: `Error saving event record: ${e}` };
  }
};

export const updateEventAttendees = async ({ event, contacts, user }) => {
  const fromContacts = event.attendees.items.map(a => a.contact);

  const attendeesToAdd = differenceBy(
    contacts,
    fromContacts,
    contact => contact.id
  );
  const attendeesToDelete = differenceBy(
    fromContacts,
    contacts,
    contact => contact.id
  );
  console.log(
    "updateEventAttendees",
    attendeesToAdd.length,
    attendeesToDelete.length
  );
  const { error: addError } = await addEventAttendees({
    event,
    contacts: attendeesToAdd,
    user
  });
  if (addError) return { error: addError };
  const { error: deleteError } = await deleteEventAttendees({
    event,
    contacts: attendeesToDelete
  });
  if (deleteError) return { error: deleteError };

  const { error: getError, event: updatedEvent } = await getEventById(event.id);
  if (getError) return { error: getError };
  return { event: updatedEvent };
};

export const addEventAttendees = async ({ event, contacts, user }) => {
  try {
    for (const contact of contacts) {
      // console.log(contact.id, event.id);
      if (!contact.id || !event.id) throw "Missing contact.id or event.id";
      const res = await API.graphql(
        graphqlOperation(mutations.createEventAttendee, {
          input: {
            eventId: event.id,
            attendeeId: contact.id,
            cognitoUserId: user.cognitoUserId
          }
        })
      );
      console.log(`added eventattendee for contact ${contact.id}`, res);
    }

    return {};
  } catch (e) {
    console.log(e);
    return { error: `Error adding people to event: ${e}` };
  }
};
export const deleteEventAttendees = async ({ event, contacts }) => {
  try {
    for (const contact of contacts) {
      // console.log(contact.id, event.id);
      if (!contact.id || !event.id) throw "Missing contact.id or event.id";
      const attendee = event.attendees.items.find(
        attendee => attendee.contact.id === contact.id
      );
      console.log(`deleting ${attendee.id}`);
      if (!attendee) throw `Can't find attendee ID for contact ${contact.id}`;
      const res = await API.graphql(
        graphqlOperation(mutations.deleteEventAttendee, {
          input: {
            id: attendee.id
          }
        })
      );
      console.log(`deleted eventattendee for contact ${contact.id}`, res);
    }

    return {};
  } catch (e) {
    console.log(e);
    return {
      error: `Error deleting people from event: ${get(e, "errors[0].message")}`
    };
  }
};
export const createEventWithContacts = async ({ title, user, contacts }) => {
  console.log(`creating event for user ${user.id}`);
  const { event, error: createEventError } = await createEvent({
    user,
    title
  });
  if (createEventError) return { error: createEventError };
  console.log(`created event`, event);
  console.log("adding contacts", contacts);
  // return { error: "testing" };
  try {
    for (const contact of contacts) {
      // console.log(contact.id, event.id);
      if (!contact.id || !event.id) throw "Missing contact.id or event.id";
      const res = await API.graphql(
        graphqlOperation(mutations.createEventAttendee, {
          input: {
            eventId: event.id,
            attendeeId: contact.id,
            cognitoUserId: user.cognitoUserId
          }
        })
      );
      console.log(`created eventattendee for contact ${contact.id}`, res);
    }

    return { event };
  } catch (e) {
    console.log(e);
    return { error: `Error adding people to newly created event: ${e}` };
  }
};

export const updateEvent = async eventInput => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.updateEvent, { input: eventInput })
    );
    return { event: res.data.updateEvent };
  } catch (e) {
    console.log(e);
    return {
      error: `Error saving event record: ${get(e, "errors[0].message")}`
    };
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
    console.log(e);
    return { error: `Error deleting event: ${get(e, "errors[0].message")}` };
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
    console.log(e);
    return { error: `Error updating account: ${e}` };
  }
};
export const getContacts = async () => {
  // not used
  try {
    const res = await API.graphql(
      graphqlOperation(queries.listContacts)
      // graphqlOperation(queries.listContacts, { contactUserId: userId })
    );
    return res.data.listContacts.items;
  } catch (e) {
    console.log(e);
    return { error: `Error listing contacts: ${e}` };
  }
};
export const getEventById = async eventId => {
  try {
    const res = await API.graphql(
      graphqlOperation(queries.getEvent, { id: eventId })
      // graphqlOperation(queries.listContacts, { contactUserId: userId })
    );
    return { event: res.data.getEvent };
  } catch (e) {
    console.log(e);
    return { error: `Error getting event: ${e}` };
  }
};
export const getEventByIdWithMessages = async eventId => {
  // careful, this loads the mesages. designed for EventScreen
  try {
    const res = await API.graphql(
      graphqlOperation(queries.getEventWithMessages, { id: eventId })
      // graphqlOperation(queries.listContacts, { contactUserId: userId })
    );
    return { event: res.data.getEvent };
  } catch (e) {
    console.log(e);
    return { error: `Error getting event: ${e}` };
  }
};

import Auth from "@aws-amplify/auth";
import API, { graphqlOperation } from "@aws-amplify/api";
import _PubSub from "@aws-amplify/pubsub"; // keep this line for current version of react. it's a workaround for https://github.com/aws-amplify/amplify-js/issues/2184
import { differenceBy, get } from "lodash";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";

export const subscribeToServerUpdate = ({ callback, type, id }) => {
  try {
    return API.graphql(
      graphqlOperation(subscriptions[`onUpdate${type}`], { id })
    ).subscribe({
      next: data => {
        console.log("received data from server subscription");
        // console.log(Object.keys(data.value));
        callback({ data: data.value.data[`onUpdate${type}`] });
      },
      // complete: data => {
      //   console.log("subscribeToEventUpdate/complete: ", data);
      // },
      error: e => {
        console.log(e);
        callback({
          error: `Error subscribing to server updates: ${get(
            e,
            "error.errors[0].message"
          )}`
        });
      }
    });
  } catch (e) {
    console.log(e);
    callback({ error: `Error subscribing to server: ${e}` });
    return;
  }
};

// export const getUserShallow = async userId => {
//   try {
//     const res = await API.graphql(
//       graphqlOperation(queries.getUserShallow, { id: userId })
//     );
//     const user = res.data.getUser;
//     return { user };
//   } catch (e) {
//     console.log(e);
//     return {
//       error: `Error loading your account: ${get(e, "errors[0].message")}`
//     };
//   }
// };
// let cache = {}
export async function getCurrentUser() {
  const cognitoUser = await Auth.currentAuthenticatedUser();
  if (!cognitoUser) return { error: "You are not logged in." };
  const cognitoUserId = cognitoUser.attributes.sub;

  try {
    // console.log("getting API user for cognito ID", cognitoUserId);

    const res = await API.graphql(
      graphqlOperation(queries.userByCognitoUserId, { cognitoUserId })
    );
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
}

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
    return { error: `Error creating account: ${get(e, "errors[0].message")}` };
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
    return { error: `Error deleting account: ${get(e, "errors[0].message")}` };
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
//     return { error: `Error deleting contact: ${get(e, "errors[0].message")}` };
//   }
// };

export const getEventsForKids = async ({ user }) => {
  if (!user) return { error: "Missing user in getEventPhonesForKids" };
  const kidContacts = user.contacts.items.filter(c => c.type === "kid");
  let eventPhones = [];

  for (const kidContact of kidContacts) {
    const { user: kidUser, error } = await getKidUserWithEventPhones(
      kidContact.phone
    );
    if (error) return { error };

    const isReciprocal = !!kidUser.contacts.items.find(
      c => c.type === "parent" && c.phone === user.phone
    );
    if (!isReciprocal) {
      console.log(
        `kid ${kidContact.phone} did not reciprocate so skipping this kid on the parent's home screen`
      );
      continue;
    }

    const kidEventPhones = kidUser.eventPhonesByPhone.items;

    eventPhones.push(...kidEventPhones);
  }
  const events = eventPhones
    .map(ep => ep.event)
    .filter(ev => ev.type === "both" || ev.type === "parents");
  return { events };
};

const getKidUserWithEventPhones = async phone => {
  try {
    if (!phone) throw "Missing phone";
    const res = await API.graphql(
      graphqlOperation(queries.kidUsersWithEventPhones, {
        phone
      })
    );

    return { user: res.data.userByPhone.items[0] };
  } catch (e) {
    console.log("getKidUserWithEventPhones", e);
    return { error: `Error getting your data: ${get(e, "errors[0].message")}` };
  }
};
const getUserByPhone = async phone => {
  try {
    if (!phone) throw "Missing phone";
    const res = await API.graphql(
      graphqlOperation(queries.userByPhone, {
        phone
      })
    );

    return { user: res.data.userByPhone.items[0] };
  } catch (e) {
    console.log("getUserByPhone", e);
    return { error: `Error loading data: ${get(e, "errors[0].message")}` };
  }
};
const updateLatestMessageForPhones = async ({ phones, message }) => {
  for (const phone of phones) {
    const { user, error } = await getUserByPhone(phone);
    if (error) return { error };
    if (!user) continue; // This is normal. Just means a contact whose phone hasn't been claimed by a user.
    const { error: updateError } = await updateLatestMessageForUser({
      user,
      message
    });
    if (updateError) return { error: updateError };
  }
  return {};
};
const updateLatestMessageForUser = async ({ user, message }) => {
  try {
    if (!user) throw "Missing user";
    if (!user.id) throw "Missing ID for user";
    const res = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id: user.id, userLatestMessageId: message.id }
      })
    );
    return {};
  } catch (e) {
    console.log("updateLatestMessageForUsers", e);
    return { error: `Error updating user: ${get(e, "errors[0].message")}` };
  }
};

const updateLatestMessageForEventPhones = async ({ eventPhones, message }) => {
  try {
    for (const eventPhone of eventPhones) {
      if (!eventPhone.id) throw "Missing ID for eventphone";
      const res = await API.graphql(
        graphqlOperation(mutations.updateEventPhone, {
          input: { id: eventPhone.id, eventPhoneLatestMessageId: message.id }
        })
      );
    }
    return {};
  } catch (e) {
    console.log("updateLatestMessageForEventPhones", e);
    return { error: `Error updating user: ${get(e, "errors[0].message")}` };
  }
};

export const createMessage = async ({
  localSentAt,
  text,
  eventId,
  userId,
  cognitoUserId
}) => {
  const { event, error: getEventError } = await getEventById(eventId);
  if (getEventError) return { error: getEventError };

  try {
    const res = await API.graphql(
      graphqlOperation(mutations.createMessage, {
        input: {
          localSentAt,
          text,
          eventId,
          userId,
          cognitoUserId
        }
      })
    );
    const message = res.data.createMessage;
    const { event: updatedEvent, error: updateEventError } = await updateEvent({
      id: event.id,
      eventLatestMessageId: message.id
    });
    if (updateEventError) return { error: updateEventError };

    /* Update eventPhone.latestMessage */

    const eventPhones = event.eventPhones.items;

    // console.log(`eventphones`, eventPhones.length, message);
    // return {};
    const {
      error: updatedEventPhoneError
    } = await updateLatestMessageForEventPhones({
      eventPhones,
      message
    });
    if (updatedEventPhoneError) return { error: updatedEventPhoneError };

    //// Update user.latestMessage
    const phones = eventPhones.map(ep => ep.phone);
    const { error: updatedUserError } = await updateLatestMessageForPhones({
      phones,
      message
    });
    if (updatedUserError) return { error: updatedUserError };

    return { message, event: updatedEvent };
  } catch (e) {
    console.log(e);
    return { error: `Error saving message: ${get(e, "errors[0].message")}` };
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
          userId: user.id,
          cognitoUserId: user.cognitoUserId
        }
      })
    );
    return { contact: res.data.createContact };
  } catch (e) {
    return {
      error: `Error saving contact record: ${get(e, "errors[0].message")}`
    };
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
    return {
      error: `Error saving contact record: ${get(e, "errors[0].message")}`
    };
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
    return { error: `Error deleting contact: ${get(e, "errors[0].message")}` };
  }
};

export const createEvent = async ({ title, type, user }) => {
  try {
    // console.log(`createing event for user ${userId}`);
    const res = await API.graphql(
      graphqlOperation(mutations.createEvent, {
        input: {
          title,
          type,
          userId: user.id,
          cognitoUserId: user.cognitoUserId
        }
      })
    );
    return { event: res.data.createEvent };
  } catch (e) {
    console.log(e);
    return {
      error: `Error saving event record: ${get(e, "errors[0].message")}`
    };
  }
};

export const updateEventPhones = async ({ event, eventPhones, user }) => {
  const oldEventPhones = event.eventPhones.items;

  const toAdd = differenceBy(eventPhones, oldEventPhones, "phone");
  const toDelete = differenceBy(oldEventPhones, eventPhones, "phone");
  console.log("updateEventPhones", toAdd.length, toDelete.length);
  const { error: addError } = await addEventPhones({
    event,
    eventPhones: toAdd,
    user
  });
  if (addError) return { error: addError };
  const { error: deleteError } = await deleteEventPhones({
    event,
    eventPhones: toDelete
  });
  if (deleteError) return { error: deleteError };

  return { event }; // for performance just return the old event

  // const { error: getError, event: updatedEvent } = await getEventById(event.id);
  // if (getError) return { error: getError };
  // return { event: updatedEvent };
};

export const addEventPhones = async ({ event, eventPhones, user }) => {
  try {
    for (const eventPhone of eventPhones) {
      // console.log(eventPhone.id, event.id);
      if (!eventPhone.phone || !event.id)
        throw "Missing eventPhone.phone or event.id";
      const res = await API.graphql(
        graphqlOperation(mutations.createEventPhone, {
          input: {
            phone: eventPhone.phone,
            firstName: eventPhone.firstName,
            lastName: eventPhone.lastName,
            eventId: event.id,
            cognitoUserId: user.cognitoUserId,
            userId: user.id
          }
        })
      );
      console.log(`added eventPhone ${eventPhone.id}`, res);
    }
    return {};
  } catch (e) {
    console.log(e);
    return {
      error: `Error adding phones to event: ${get(e, "errors[0].message")}`
    };
  }
};

export const deleteEventPhones = async ({ eventPhones }) => {
  try {
    for (const eventPhone of eventPhones) {
      if (!eventPhone.id) throw "Missing eventPhone.id";

      const res = await API.graphql(
        graphqlOperation(mutations.deleteEventPhone, {
          input: {
            id: eventPhone.id
          }
        })
      );
      console.log(`deleted eventPhone ${eventPhone.id}`, res);
    }

    return {};
  } catch (e) {
    console.log(e);
    return {
      error: `Error deleting people from event: ${get(e, "errors[0].message")}`
    };
  }
};
export const createEventWithPhones = async ({
  title,
  type,
  user,
  eventPhones
}) => {
  console.log(`creating event for user ${user.id} of type ${type}`);
  const { event, error: createEventError } = await createEvent({
    user,
    title,
    type
  });
  if (createEventError) return { error: createEventError };

  console.log("adding eventPhones", eventPhones);
  // return { error: "testing" };
  const { error: eventPhoneError } = await addEventPhones({
    event,
    user,
    eventPhones
  });
  // try {
  //   for (const eventPhone of eventPhones) {
  //     // console.log(eventPhone.id, event.id);
  //     if (!eventPhone.phone || !event.id)
  //       throw "Missing eventPhone or event.id";
  //     const res = await API.graphql(
  //       graphqlOperation(mutations.createEventPhone, {
  //         input: {
  //           eventPhoneEventId: event.id,
  //           phone: eventPhone.phone,
  //           firstName: eventPhone.firstName,
  //           lastName: eventPhone.lastName,
  //           eventPhoneUserId: user.id,
  //           cognitoUserId: user.cognitoUserId
  //         }
  //       })
  //     );
  //     console.log(`created eventphone for eventPhone ${eventPhone.phone}`, res);
  //   }

  if (eventPhoneError) return { error: eventPhoneError };

  const { event: updatedEvent, error: getEventError } = await getEventById(
    event.id
  );
  if (getEventError) return { error: getEventError };
  return { event: updatedEvent };
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
  /// need to either use deletedAt or delete independent objects. for now avoid deleting events altogether
  try {
    await API.graphql(
      graphqlOperation(mutations.deleteEvent, {
        input: { id: eventId }
      })
    );

    //     Also delete dependent objects

    // deleteEventPhones({eventPhones})
    //
    // for (const of )
    //     await API.graphql(
    //       graphqlOperation(mutations.deleteEventPhone, {
    //         input: { eventPhoneEventId: eventId }
    //       })
    //     );
    //
    //     await API.graphql(
    //       graphqlOperation(mutations.deleteMessage, {
    //         input: { messageEventId: eventId }
    //       })
    //     // );

    return {};
  } catch (e) {
    console.log(e);
    return { error: `Error deleting event: ${get(e, "errors[0].message")}` };
  }
};

// let eventPhones = [];
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
//   return { error: `Error saving contact record: ${get(e, "errors[0].message")}` };
// }

export const updateUser = async input => {
  console.log("updating user", input);
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
    return { error: `Error updating account: ${get(e, "errors[0].message")}` };
  }
};
export const getContacts = async () => {
  // not used
  try {
    const res = await API.graphql(graphqlOperation(queries.listContacts));
    return res.data.listContacts.items;
  } catch (e) {
    console.log(e);
    return { error: `Error listing contacts: ${get(e, "errors[0].message")}` };
  }
};
export const getEventById = async eventId => {
  try {
    const res = await API.graphql(
      graphqlOperation(queries.getEvent, { id: eventId })
    );
    return { event: res.data.getEvent };
  } catch (e) {
    console.log(e);
    return { error: `Error getting event: ${get(e, "errors[0].message")}` };
  }
};
export const getEventByIdWithMessages = async eventId => {
  // careful, this loads the mesages. designed for EventScreen
  try {
    const res = await API.graphql(
      graphqlOperation(queries.getEventWithMessages, { id: eventId })
    );
    return { event: res.data.getEvent };
  } catch (e) {
    console.log(e);
    return {
      error: `Error getting event with messages: ${get(e, "errors[0].message")}`
    };
  }
};
export const getEventPhonesByPhone = async phone => {
  //  designed for HomeScreen
  try {
    const res = await API.graphql(
      graphqlOperation(queries.eventPhonesByPhone, {
        phone,
        sortDirection: "DESC",
        limit: 200
      })
    );
    // console.log("p", res.data);
    return { eventPhones: res.data.eventPhonesByPhone.items };
  } catch (e) {
    console.log(e);
    return {
      error: `Error getting eventphones: ${get(e, "errors[0].message")}`
    };
  }
};
export const getContactsByPhone = async phone => {
  //  designed for HomeScreen
  // authorization rules will be odd with this one. can make a resolver that takes userid
  try {
    const res = await API.graphql(
      graphqlOperation(queries.contactsByPhone, { phone, limit: 100 })
    );
    return { contacts: res.data.contactsByPhone.items };
  } catch (e) {
    console.log(e);
    return {
      error: `Error getting eventphones: ${get(e, "errors[0].message")}`
    };
  }
};

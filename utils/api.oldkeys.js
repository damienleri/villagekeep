import Auth from "@aws-amplify/auth";
import API, { graphqlOperation } from "@aws-amplify/api";
import { differenceBy, get } from "lodash";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";

// export const subscribeToMessages = async onReceiveMessage => {
//   const subscription = API.graphql(
//     graphqlOperation(subscriptions.onCreateMessage)
//   ).subscribe({
//     next: messageData => {
//       console.log(messageData);
//       onReceiveMessage({ message: messageData });
//     }
//   });
//   return {subscription}
// };
//
// export const unsubscribeToMessages = subscription => {
//   subscription.unsubscribe();
// };
export const subscribeToEventUpdate = async ({ callback, eventId }) => {
  try {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateEvent, { id: eventId })
    ).subscribe({
      next: data => {
        // console.log(eventData);
        callback(data.value.data.onUpdateEvent);
      }
    });
    return { subscription };
  } catch (e) {
    console.log(e);
    return { error: `Error subscibing to event update: ${e}` };
  }
};

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

export const createMessage = async ({ localSentAt, text, event, user }) => {
  try {
    const res = await API.graphql(
      graphqlOperation(mutations.createMessage, {
        input: {
          localSentAt,
          text,
          messageEventId: event.id,
          messageUserId: user.id,
          cognitoUserId: user.cognitoUserId
        }
      })
    );
    const message = res.data.createMessage;
    const { event: updatedEvent, error: updateEventError } = await updateEvent({
      id: event.id,
      eventLatestMessageId: message.id
    });
    if (updateEventError) return { error: updateEventError };
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
          contactUserId: user.id,
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
            eventPhoneEventId: event.id,
            cognitoUserId: user.cognitoUserId,
            eventPhoneUserId: user.id
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
export const deleteEventPhones = async ({ event, eventPhones }) => {
  try {
    for (const eventPhone of eventPhones) {
      if (!eventPhone.id || !event.id)
        throw "Missing eventPhone.id or event.id";

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
export const createEventWithPhones = async ({ title, user, eventPhones }) => {
  console.log(`creating event for user ${user.id}`);
  const { event, error: createEventError } = await createEvent({
    user,
    title
  });
  if (createEventError) return { error: createEventError };
  console.log(`created event`, event);
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

  return { event };
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
    await API.graphql(
      graphqlOperation(mutations.deleteEvent, {
        input: { id: eventId }
      })
    );
    //Also delete dependent objects
    ////on second thought there is no updateMany mutations so we would need to loop through the following individually:

    // await API.graphql(
    //   graphqlOperation(mutations.deleteEventPhone, {
    //     input: { eventPhoneEventId: eventId }
    //   })
    // );
    //
    // await API.graphql(
    //   graphqlOperation(mutations.deleteMessage, {
    //     input: { messageEventId: eventId }
    //   })
    // );

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
      graphqlOperation(queries.eventPhonesByPhone, { phone })
    );
    return { eventPhones: res.data.eventPhonesByPhone.items };
  } catch (e) {
    console.log(e);
    return {
      error: `Error getting eventphones: ${get(e, "errors[0].message")}`
    };
  }
};

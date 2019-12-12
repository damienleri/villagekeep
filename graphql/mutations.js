/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
  }
}
`;
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    id
    createdAt
    updatedAt
    title
  }
}
`;
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    id
    title
    eventPhones {
      items {
        id
        phone
        firstName
        lastName
      }
      nextToken
    }
  }
}
`;
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    id
  }
}
`;
// export const createEventAttendee = `mutation CreateEventAttendee($input: CreateEventAttendeeInput!) {
//   createEventAttendee(input: $input) {
//     id
//   }
// }
// `;
// export const deleteEventAttendee = `mutation DeleteEventAttendee($input: DeleteEventAttendeeInput!) {
//   deleteEventAttendee(input: $input) {
//     id
//   }
// }
// `;
export const createContact = `mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
    id
  }
}
`;
export const updateContact = `mutation UpdateContact($input: UpdateContactInput!) {
  updateContact(input: $input) {
    id
    type
    phone
    firstName
    lastName
  }
}
`;
export const deleteContact = `mutation DeleteContact($input: DeleteContactInput!) {
  deleteContact(input: $input) {
    id
  }
}
`;
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    createdAt
    localSentAt
    text
    user {
      id
      firstName
      lastName
      isParent
    }
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    createdAt
    text
    user {
      id
      firstName
      lastName
      isParent
    }
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
  }
}
`;

export const createEventPhone = `mutation CreateEventPhone($input: CreateEventPhoneInput!) {
  createEventPhone(input: $input) {
    id
  }
}
`;

export const deleteEventPhone = `mutation DeleteEventPhone($input: DeleteEventPhoneInput!) {
  deleteEventPhone(input: $input) {
    id
  }
}
`;

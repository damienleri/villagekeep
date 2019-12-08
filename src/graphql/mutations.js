/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    isParent
    contacts {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        type
        phone
        firstName
        lastName
      }
      nextToken
    }
    events {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        owner
      }
      nextToken
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
      }
      nextToken
    }
    deletedAt
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    isParent
    contacts {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        type
        phone
        firstName
        lastName
      }
      nextToken
    }
    events {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        owner
      }
      nextToken
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
      }
      nextToken
    }
    deletedAt
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    isParent
    contacts {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        type
        phone
        firstName
        lastName
      }
      nextToken
    }
    events {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        owner
      }
      nextToken
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
      }
      nextToken
    }
    deletedAt
  }
}
`;
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    title
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        owner
      }
      editedAt
      deletedAt
    }
    owner
  }
}
`;
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    title
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        owner
      }
      editedAt
      deletedAt
    }
    owner
  }
}
`;
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    title
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        owner
      }
      editedAt
      deletedAt
    }
    owner
  }
}
`;
export const createEventAttendee = `mutation CreateEventAttendee($input: CreateEventAttendeeInput!) {
  createEventAttendee(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    eventId
    attendeeId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
    contact {
      id
      cognitoUserId
      createdAt
      updatedAt
      type
      phone
      firstName
      lastName
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
    }
  }
}
`;
export const updateEventAttendee = `mutation UpdateEventAttendee($input: UpdateEventAttendeeInput!) {
  updateEventAttendee(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    eventId
    attendeeId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
    contact {
      id
      cognitoUserId
      createdAt
      updatedAt
      type
      phone
      firstName
      lastName
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
    }
  }
}
`;
export const deleteEventAttendee = `mutation DeleteEventAttendee($input: DeleteEventAttendeeInput!) {
  deleteEventAttendee(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    eventId
    attendeeId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
    contact {
      id
      cognitoUserId
      createdAt
      updatedAt
      type
      phone
      firstName
      lastName
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
    }
  }
}
`;
export const createContact = `mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    type
    phone
    firstName
    lastName
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
  }
}
`;
export const updateContact = `mutation UpdateContact($input: UpdateContactInput!) {
  updateContact(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    type
    phone
    firstName
    lastName
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
  }
}
`;
export const deleteContact = `mutation DeleteContact($input: DeleteContactInput!) {
  deleteContact(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    type
    phone
    firstName
    lastName
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
  }
}
`;
export const createEventPhone = `mutation CreateEventPhone($input: CreateEventPhoneInput!) {
  createEventPhone(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
  }
}
`;
export const updateEventPhone = `mutation UpdateEventPhone($input: UpdateEventPhoneInput!) {
  updateEventPhone(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
  }
}
`;
export const deleteEventPhone = `mutation DeleteEventPhone($input: DeleteEventPhoneInput!) {
  deleteEventPhone(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
  }
}
`;
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    localSentAt
    text
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
    editedAt
    deletedAt
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    localSentAt
    text
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
    editedAt
    deletedAt
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    cognitoUserId
    createdAt
    updatedAt
    localSentAt
    text
    user {
      id
      cognitoUserId
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      deletedAt
    }
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      user {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        editedAt
        deletedAt
      }
      owner
    }
    editedAt
    deletedAt
  }
}
`;

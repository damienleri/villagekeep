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
        userId
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
        type
        userId
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
        userId
        eventId
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
        userId
        eventId
      }
      nextToken
    }
    contactsByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        type
        phone
        firstName
        lastName
        userId
      }
      nextToken
    }
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
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
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    deletedAt
    pushToken
    pushEnabled
    pushEnabledForEvents
    pushEnabledForMessages
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
        userId
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
        type
        userId
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
        userId
        eventId
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
        userId
        eventId
      }
      nextToken
    }
    contactsByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        type
        phone
        firstName
        lastName
        userId
      }
      nextToken
    }
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
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
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    deletedAt
    pushToken
    pushEnabled
    pushEnabledForEvents
    pushEnabledForMessages
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
        userId
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
        type
        userId
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
        userId
        eventId
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
        userId
        eventId
      }
      nextToken
    }
    contactsByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        type
        phone
        firstName
        lastName
        userId
      }
      nextToken
    }
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
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
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    deletedAt
    pushToken
    pushEnabled
    pushEnabledForEvents
    pushEnabledForMessages
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
    type
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
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
        userId
        eventId
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
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
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
    type
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
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
        userId
        eventId
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
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
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
    type
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
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
        userId
        eventId
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
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    owner
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
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    usersByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      nextToken
    }
    firstName
    lastName
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
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
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    usersByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      nextToken
    }
    firstName
    lastName
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
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
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    usersByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      nextToken
    }
    firstName
    lastName
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
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
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    usersByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      nextToken
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
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
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
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
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    usersByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      nextToken
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
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
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
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
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    usersByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        isParent
        deletedAt
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      nextToken
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
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
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
      }
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
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
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
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
        userId
        eventId
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
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
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
        userId
        eventId
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
    userId
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
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
      userId
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
        pushToken
        pushEnabled
        pushEnabledForEvents
        pushEnabledForMessages
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
        userId
        eventId
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

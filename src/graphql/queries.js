/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
    deletedAt
    pushToken
    pushEnabled
    pushEnabledForEvents
    pushEnabledForMessages
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    nextToken
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    cognitoUserId
    createdAt
    updatedAt
    title
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
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
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
    nextToken
  }
}
`;
export const getContact = `query GetContact($id: ID!) {
  getContact(id: $id) {
    id
    cognitoUserId
    createdAt
    updatedAt
    type
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
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
  }
}
`;
export const listContacts = `query ListContacts(
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    }
    nextToken
  }
}
`;
export const getEventPhone = `query GetEventPhone($id: ID!) {
  getEventPhone(id: $id) {
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
  }
}
`;
export const listEventPhones = `query ListEventPhones(
  $filter: ModelEventPhoneFilterInput
  $limit: Int
  $nextToken: String
) {
  listEventPhones(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        userId
        owner
      }
    }
    nextToken
  }
}
`;
export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        userId
        owner
      }
      editedAt
      deletedAt
    }
    nextToken
  }
}
`;
export const userByCognitoUserId = `query UserByCognitoUserId(
  $cognitoUserId: String
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  userByCognitoUserId(
    cognitoUserId: $cognitoUserId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    nextToken
  }
}
`;
export const userByPhone = `query UserByPhone(
  $phone: AWSPhone
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  userByPhone(
    phone: $phone
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    nextToken
  }
}
`;
export const eventsByUser = `query EventsByUser(
  $userId: ID
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  eventsByUser(
    userId: $userId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
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
    nextToken
  }
}
`;
export const contactsByUser = `query ContactsByUser(
  $userId: ID
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  contactsByUser(
    userId: $userId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
    }
    nextToken
  }
}
`;
export const eventPhonesByPhone = `query EventPhonesByPhone(
  $phone: String
  $sortDirection: ModelSortDirection
  $filter: ModelEventPhoneFilterInput
  $limit: Int
  $nextToken: String
) {
  eventPhonesByPhone(
    phone: $phone
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
        userId
        owner
      }
    }
    nextToken
  }
}
`;
export const eventPhonesByEvent = `query EventPhonesByEvent(
  $eventId: ID
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelEventPhoneFilterInput
  $limit: Int
  $nextToken: String
) {
  eventPhonesByEvent(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
        userId
        owner
      }
    }
    nextToken
  }
}
`;
export const eventPhonesByUser = `query EventPhonesByUser(
  $userId: ID
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelEventPhoneFilterInput
  $limit: Int
  $nextToken: String
) {
  eventPhonesByUser(
    userId: $userId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
        userId
        owner
      }
    }
    nextToken
  }
}
`;
export const messagesByEvent = `query MessagesByEvent(
  $eventId: ID
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByEvent(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
        userId
        owner
      }
      editedAt
      deletedAt
    }
    nextToken
  }
}
`;
export const messagesByUser = `query MessagesByUser(
  $userId: ID
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByUser(
    userId: $userId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
        userId
        owner
      }
      editedAt
      deletedAt
    }
    nextToken
  }
}
`;

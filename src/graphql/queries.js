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
    }
    nextToken
  }
}
`;

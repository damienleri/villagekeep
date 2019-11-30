/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    createdAt
    updatedAt
    cognitoUserId
    phone
    firstName
    lastName
    isParent
    contacts {
      items {
        id
        createdAt
        updatedAt
        type
        phone
        firstName
        lastName
      }
      nextToken
    }
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
      createdAt
      updatedAt
      cognitoUserId
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getContact = `query GetContact($id: ID!) {
  getContact(id: $id) {
    id
    createdAt
    updatedAt
    type
    phone
    firstName
    lastName
    user {
      id
      createdAt
      updatedAt
      cognitoUserId
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
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
      createdAt
      updatedAt
      type
      phone
      firstName
      lastName
      user {
        id
        createdAt
        updatedAt
        cognitoUserId
        phone
        firstName
        lastName
        isParent
      }
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
      createdAt
      updatedAt
      cognitoUserId
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
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
      createdAt
      updatedAt
      cognitoUserId
      phone
      firstName
      lastName
      isParent
      contacts {
        nextToken
      }
    }
    nextToken
  }
}
`;

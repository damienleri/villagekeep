/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    createdAt
    updatedAt
    phone
    firstName
    lastName
    isParent
    createdContacts {
      items {
        id
        createdAt
        updatedAt
        type
        phone
        firstName
        lastName
        createdByUserId
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
      phone
      firstName
      lastName
      isParent
      createdContacts {
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
    createdByUserId
    createdByUser {
      id
      createdAt
      updatedAt
      phone
      firstName
      lastName
      isParent
      createdContacts {
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
      createdByUserId
      createdByUser {
        id
        createdAt
        updatedAt
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

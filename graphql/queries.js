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
export const getContact = `query GetContact($phone: AWSPhone!) {
  getContact(phone: $phone) {
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
  $phone: AWSPhone
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listContacts(
    phone: $phone
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
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

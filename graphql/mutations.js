/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createContact = `mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
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
export const updateContact = `mutation UpdateContact($input: UpdateContactInput!) {
  updateContact(input: $input) {
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
export const deleteContact = `mutation DeleteContact($input: DeleteContactInput!) {
  deleteContact(input: $input) {
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

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    phone
    firstName
    lastName
    joinedAt
    isApprover
    followedInvitation {
      id
      email
      phone
      isApprover
      createdByUser {
        id
        email
        phone
        firstName
        lastName
        joinedAt
        isApprover
      }
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    email
    phone
    firstName
    lastName
    joinedAt
    isApprover
    followedInvitation {
      id
      email
      phone
      isApprover
      createdByUser {
        id
        email
        phone
        firstName
        lastName
        joinedAt
        isApprover
      }
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    email
    phone
    firstName
    lastName
    joinedAt
    isApprover
    followedInvitation {
      id
      email
      phone
      isApprover
      createdByUser {
        id
        email
        phone
        firstName
        lastName
        joinedAt
        isApprover
      }
    }
  }
}
`;
export const createInvitation = `mutation CreateInvitation($input: CreateInvitationInput!) {
  createInvitation(input: $input) {
    id
    email
    phone
    isApprover
    createdByUser {
      id
      email
      phone
      firstName
      lastName
      joinedAt
      isApprover
      followedInvitation {
        id
        email
        phone
        isApprover
      }
    }
  }
}
`;
export const updateInvitation = `mutation UpdateInvitation($input: UpdateInvitationInput!) {
  updateInvitation(input: $input) {
    id
    email
    phone
    isApprover
    createdByUser {
      id
      email
      phone
      firstName
      lastName
      joinedAt
      isApprover
      followedInvitation {
        id
        email
        phone
        isApprover
      }
    }
  }
}
`;
export const deleteInvitation = `mutation DeleteInvitation($input: DeleteInvitationInput!) {
  deleteInvitation(input: $input) {
    id
    email
    phone
    isApprover
    createdByUser {
      id
      email
      phone
      firstName
      lastName
      joinedAt
      isApprover
      followedInvitation {
        id
        email
        phone
        isApprover
      }
    }
  }
}
`;

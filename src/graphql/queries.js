/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getInvitation = `query GetInvitation($id: ID!) {
  getInvitation(id: $id) {
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
export const listInvitations = `query ListInvitations(
  $filter: ModelInvitationFilterInput
  $limit: Int
  $nextToken: String
) {
  listInvitations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;

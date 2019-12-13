// export const getUserShallow = `query GetUser($id: ID!) {
//   getUser(id: $id) {
//     id
//     cognitoUserId
//     createdAt
//     updatedAt
//     phone
//     firstName
//     lastName
//     isParent
//     deletedAt
//     pushToken
//     pushEnabled
//     pushEnabledForEvents
//     pushEnabledForMessages
//   }
// }
// `;
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
      pushEnabled
      events {
        items {
          latestMessage {
            id
            text
            createdAt
            user {
              id
              firstName
              lastName
            }
          }
        }
      }
      contacts {
        items {
          id
          type
          firstName
          lastName
          phone
          user {
            id
            firstName
            lastName
            phone
          }
        }
        nextToken
      }
      contactsByPhone {
        items {
          type
          user {
            id
            firstName
            lastName
            phone
          }
        }
        nextToken
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
      event {
        id
        createdAt
        title
        user {
          id
          firstName
          lastName
        }
        eventPhones {
          items {
            firstName
            lastName
            phone
          }
        }
        latestMessage {
          createdAt
          text
          user {
            id
            firstName
            lastName
            phone
          }
        }
      }
    }
    nextToken
  }
}
`;

// export const listUsers = `query ListUsers(
//   $filter: ModelUserFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     items {
//       id
//       createdAt
//       updatedAt
//       cognitoUserId
//       phone
//       firstName
//       lastName
//       isParent
//       contacts {
//         nextToken
//       }
//       events {
//         nextToken
//       }
//       deletedAt
//     }
//     nextToken
//   }
// }
// `;
// export const getEvent = `query GetEvent($id: ID!) {
//   getEvent(id: $id) {
//     id
//     createdAt
//     title
//
//     user {
//       id
//       firstName
//       lastName
//     }
//     eventPhones {
//       items {
//         id
//         phone
//         firstName
//         lastName
//       }
//       nextToken
//     }
//   }
// }
// `;
export const getEventWithMessages = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    createdAt
    title
    user {
      id
      firstName
      lastName
    }
    messages(sortDirection: DESC) {
      items {
        id
        localSentAt
        text
        createdAt
        user {
          id
          firstName
          lastName
        }
      }
      nextToken
    }
    eventPhones {
      items {
        id
        phone
        firstName
        lastName
      }
      nextToken
    }
  }
}
`;
// export const listEvents = `query ListEvents(
//   $filter: ModelEventFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     items {
//       id
//       createdAt
//       updatedAt
//       title
//       user {
//         id
//         createdAt
//         updatedAt
//         cognitoUserId
//         phone
//         firstName
//         lastName
//         isParent
//         deletedAt
//       }
//     }
//     nextToken
//   }
// }
// `;
// export const getContact = `query GetContact($id: ID!) {
//   getContact(id: $id) {
//     id
//     createdAt
//     updatedAt
//     type
//     phone
//     firstName
//     lastName
//     user {
//       id
//       createdAt
//       updatedAt
//       cognitoUserId
//       phone
//       firstName
//       lastName
//       isParent
//       contacts {
//         nextToken
//       }
//       events {
//         nextToken
//       }
//       deletedAt
//     }
//     events {
//       items {
//         id
//         eventId
//         attendeeId
//       }
//       nextToken
//     }
//   }
// }
// `;
// export const listContacts = `query ListContacts(
//   $filter: ModelContactFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     items {
//       id
//       createdAt
//       updatedAt
//       type
//       phone
//       firstName
//       lastName
//       user {
//         id
//         createdAt
//         updatedAt
//         cognitoUserId
//         phone
//         firstName
//         lastName
//         isParent
//         deletedAt
//       }
//       events {
//         nextToken
//       }
//     }
//     nextToken
//   }
// }
// `;

// export const userByPhone = `query UserByPhone(
//   $phone: AWSPhone
//   $sortDirection: ModelSortDirection
//   $filter: ModelUserFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   userByPhone(
//     phone: $phone
//     sortDirection: $sortDirection
//     filter: $filter
//     limit: $limit
//     nextToken: $nextToken
//   ) {
//     items {
//       id
//       createdAt
//       updatedAt
//       cognitoUserId
//       phone
//       firstName
//       lastName
//       isParent
//       contacts {
//         nextToken
//       }
//       events {
//         nextToken
//       }
//       deletedAt
//     }
//     nextToken
//   }
// }
// `;
export const contactsByPhone = `query ContactsByPhone(
  $phone: AWSPhone
  $sortDirection: ModelSortDirection
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  contactsByPhone(
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

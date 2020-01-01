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
// const eventPhones = `
const eventPhonesFragment = `fragment EventPhones on EventPhone {
    updatedAt
    phone
    latestMessage {
      id
    }
    event {
      id
      createdAt
      title
      type
      user {
        id
        firstName
        lastName
      }
      eventPhones {
        items {
          id
          firstName
          lastName
          phone
          user {
            id
          }
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
`;

export const userByCognitoUserId = `
query UserByCognitoUserId(
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
      pushToken
      latestMessage {
        id
      }
      events {
        items {
          id
          type
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

          usersByPhone(limit: 1) {
            items {
              id
              firstName
              lastName
              phone
              contacts {
                items {
                  id
                  type
                  firstName
                  lastName
                  phone
                }
                nextToken
              }
            }
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
//${eventPhonesFragment}

export const kidUsersWithEventPhones = `query kidUsersWithEventPhones(
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
      contacts(limit: 500) {
        items {
          id
          type
          phone
        }
      }
      eventPhonesByPhone(limit: 200, sortDirection: DESC) {
        items {
          updatedAt
          phone
          latestMessage {
            id
          }
          event {
            id
            createdAt
            updatedAt
            title
            type
            user {
              id
              firstName
              lastName
            }
            eventPhones {
              items {
                id
                firstName
                lastName
                phone
                user {
                  id
                }
              }
              nextToken
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
  }
}
`;
export const eventPhonesByPhone = `
query EventPhonesByPhone(
  $phone: AWSPhone
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
      updatedAt
      phone
      latestMessage {
        id
      }
      event {
        id
        createdAt
        updatedAt
        title
        type
        user {
          id
          firstName
          lastName
        }
        eventPhones {
           items {
             id
             firstName
             lastName
             phone
             user {
               id
             }
           }
           nextToken
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

export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
export const getEventWithMessages = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    createdAt
    title
    type
    user {
      id
      firstName
      lastName
    }
    messages(sortDirection: DESC, limit: 100) {
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

// used by createMessage to update user.latestMessage for home page subscription
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
    }
  }
}
`;

// used by homescreen for parents to find eventphones that reference their kids' phones
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
      type
      user {
        id
        phone
        eventPhonesByPhone {
          items {

          }
        }
      }
    }
    nextToken
  }
}
`;
// export const contactsByPhone = `query ContactsByPhone(
//   $phone: AWSPhone
//   $sortDirection: ModelSortDirection
//   $filter: ModelContactFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   contactsByPhone(
//     phone: $phone
//     sortDirection: $sortDirection
//     filter: $filter
//     limit: $limit
//     nextToken: $nextToken
//   ) {
//     items {
//       id
//       type
//       user {
//         id
//         phone
//       }
//     }
//     nextToken
//   }
// }
// `;

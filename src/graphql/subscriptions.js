/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateContact = `subscription OnCreateContact {
  onCreateContact {
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
export const onUpdateContact = `subscription OnUpdateContact {
  onUpdateContact {
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
export const onDeleteContact = `subscription OnDeleteContact {
  onDeleteContact {
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

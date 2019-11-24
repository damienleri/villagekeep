/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateInvitation = `subscription OnCreateInvitation {
  onCreateInvitation {
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
export const onUpdateInvitation = `subscription OnUpdateInvitation {
  onUpdateInvitation {
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
export const onDeleteInvitation = `subscription OnDeleteInvitation {
  onDeleteInvitation {
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

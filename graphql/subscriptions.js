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
    events {
      items {
        id
        createdAt
        updatedAt
        title
      }
      nextToken
    }
    deletedAt
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
    events {
      items {
        id
        createdAt
        updatedAt
        title
      }
      nextToken
    }
    deletedAt
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
    events {
      items {
        id
        createdAt
        updatedAt
        title
      }
      nextToken
    }
    deletedAt
  }
}
`;
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
    id
    createdAt
    updatedAt
    title
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
      events {
        nextToken
      }
      deletedAt
    }
    attendees {
      items {
        id
        eventId
        attendeeId
      }
      nextToken
    }
  }
}
`;
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
    id
    createdAt
    updatedAt
    title
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
      events {
        nextToken
      }
      deletedAt
    }
    attendees {
      items {
        id
        eventId
        attendeeId
      }
      nextToken
    }
  }
}
`;
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
    id
    createdAt
    updatedAt
    title
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
      events {
        nextToken
      }
      deletedAt
    }
    attendees {
      items {
        id
        eventId
        attendeeId
      }
      nextToken
    }
  }
}
`;
export const onCreateEventAttendee = `subscription OnCreateEventAttendee {
  onCreateEventAttendee {
    id
    eventId
    attendeeId
    event {
      id
      createdAt
      updatedAt
      title
      user {
        id
        createdAt
        updatedAt
        cognitoUserId
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      attendees {
        nextToken
      }
    }
    contact {
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
        deletedAt
      }
      events {
        nextToken
      }
    }
  }
}
`;
export const onUpdateEventAttendee = `subscription OnUpdateEventAttendee {
  onUpdateEventAttendee {
    id
    eventId
    attendeeId
    event {
      id
      createdAt
      updatedAt
      title
      user {
        id
        createdAt
        updatedAt
        cognitoUserId
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      attendees {
        nextToken
      }
    }
    contact {
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
        deletedAt
      }
      events {
        nextToken
      }
    }
  }
}
`;
export const onDeleteEventAttendee = `subscription OnDeleteEventAttendee {
  onDeleteEventAttendee {
    id
    eventId
    attendeeId
    event {
      id
      createdAt
      updatedAt
      title
      user {
        id
        createdAt
        updatedAt
        cognitoUserId
        phone
        firstName
        lastName
        isParent
        deletedAt
      }
      attendees {
        nextToken
      }
    }
    contact {
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
        deletedAt
      }
      events {
        nextToken
      }
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
      events {
        nextToken
      }
      deletedAt
    }
    events {
      items {
        id
        eventId
        attendeeId
      }
      nextToken
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
      events {
        nextToken
      }
      deletedAt
    }
    events {
      items {
        id
        eventId
        attendeeId
      }
      nextToken
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
      events {
        nextToken
      }
      deletedAt
    }
    events {
      items {
        id
        eventId
        attendeeId
      }
      nextToken
    }
  }
}
`;

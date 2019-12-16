/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    isParent
    contacts {
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
      }
      nextToken
    }
    events {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      nextToken
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    contactsByPhone {
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
      }
      nextToken
    }
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    deletedAt
    pushToken
    pushEnabled
    pushEnabledForEvents
    pushEnabledForMessages
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    isParent
    contacts {
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
      }
      nextToken
    }
    events {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      nextToken
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    contactsByPhone {
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
      }
      nextToken
    }
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    deletedAt
    pushToken
    pushEnabled
    pushEnabledForEvents
    pushEnabledForMessages
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    cognitoUserId
    createdAt
    updatedAt
    phone
    firstName
    lastName
    isParent
    contacts {
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
      }
      nextToken
    }
    events {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      nextToken
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    contactsByPhone {
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
      }
      nextToken
    }
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    deletedAt
    pushToken
    pushEnabled
    pushEnabledForEvents
    pushEnabledForMessages
  }
}
`;
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
    id
    cognitoUserId
    createdAt
    updatedAt
    title
    type
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    owner
  }
}
`;
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
    id
    cognitoUserId
    createdAt
    updatedAt
    title
    type
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    owner
  }
}
`;
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
    id
    cognitoUserId
    createdAt
    updatedAt
    title
    type
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    messages {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      nextToken
    }
    eventPhones {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
    owner
  }
}
`;
export const onCreateContact = `subscription OnCreateContact {
  onCreateContact {
    id
    cognitoUserId
    createdAt
    updatedAt
    type
    phone
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
  }
}
`;
export const onUpdateContact = `subscription OnUpdateContact {
  onUpdateContact {
    id
    cognitoUserId
    createdAt
    updatedAt
    type
    phone
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
  }
}
`;
export const onDeleteContact = `subscription OnDeleteContact {
  onDeleteContact {
    id
    cognitoUserId
    createdAt
    updatedAt
    type
    phone
    eventPhonesByPhone {
      items {
        id
        cognitoUserId
        createdAt
        updatedAt
        phone
        firstName
        lastName
        userId
        eventId
      }
      nextToken
    }
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
  }
}
`;
export const onCreateEventPhone = `subscription OnCreateEventPhone {
  onCreateEventPhone {
    id
    cognitoUserId
    createdAt
    updatedAt
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
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
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
  }
}
`;
export const onUpdateEventPhone = `subscription OnUpdateEventPhone {
  onUpdateEventPhone {
    id
    cognitoUserId
    createdAt
    updatedAt
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
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
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
  }
}
`;
export const onDeleteEventPhone = `subscription OnDeleteEventPhone {
  onDeleteEventPhone {
    id
    cognitoUserId
    createdAt
    updatedAt
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
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
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    latestMessage {
      id
      cognitoUserId
      createdAt
      updatedAt
      localSentAt
      text
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
      eventId
      event {
        id
        cognitoUserId
        createdAt
        updatedAt
        title
        type
        userId
        owner
      }
      editedAt
      deletedAt
    }
  }
}
`;
export const onCreateMessage = `subscription OnCreateMessage {
  onCreateMessage {
    id
    cognitoUserId
    createdAt
    updatedAt
    localSentAt
    text
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
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
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    editedAt
    deletedAt
  }
}
`;
export const onUpdateMessage = `subscription OnUpdateMessage {
  onUpdateMessage {
    id
    cognitoUserId
    createdAt
    updatedAt
    localSentAt
    text
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
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
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    editedAt
    deletedAt
  }
}
`;
export const onDeleteMessage = `subscription OnDeleteMessage {
  onDeleteMessage {
    id
    cognitoUserId
    createdAt
    updatedAt
    localSentAt
    text
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
      contacts {
        nextToken
      }
      events {
        nextToken
      }
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      contactsByPhone {
        nextToken
      }
      eventPhonesByPhone {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      deletedAt
      pushToken
      pushEnabled
      pushEnabledForEvents
      pushEnabledForMessages
    }
    eventId
    event {
      id
      cognitoUserId
      createdAt
      updatedAt
      title
      type
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
      messages {
        nextToken
      }
      eventPhones {
        nextToken
      }
      latestMessage {
        id
        cognitoUserId
        createdAt
        updatedAt
        localSentAt
        text
        userId
        eventId
        editedAt
        deletedAt
      }
      owner
    }
    editedAt
    deletedAt
  }
}
`;

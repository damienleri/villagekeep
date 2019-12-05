/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
  }
}
`;
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
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
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
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
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    id
  }
}
`;
export const createEventAttendee = `mutation CreateEventAttendee($input: CreateEventAttendeeInput!) {
  createEventAttendee(input: $input) {
    id
  }
}
`;
export const updateEventAttendee = `mutation UpdateEventAttendee($input: UpdateEventAttendeeInput!) {
  updateEventAttendee(input: $input) {
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
export const deleteEventAttendee = `mutation DeleteEventAttendee($input: DeleteEventAttendeeInput!) {
  deleteEventAttendee(input: $input) {
    id
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
export const deleteContact = `mutation DeleteContact($input: DeleteContactInput!) {
  deleteContact(input: $input) {
    id
  }
}
`;

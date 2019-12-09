import { parsePhoneNumberFromString } from "libphonenumber-js";
import moment from "moment";

export const formatPhone = phone => {
  const phoneParsed = parsePhoneNumberFromString(phone, "US");
  return phoneParsed.country === "US"
    ? phoneParsed.formatNational()
    : phoneParsed.formatInternational();
};

export const getFormattedNameFromContact = contact => {
  const user = null;
  // TODO. this would be a user whose phone matches the contact.
  // but it would be too slow to query for it in the middle of the multi-select on editevent screen
  const firstName = user ? user.firstName : contact.firstName;
  const lastName = user ? user.lastName : contact.lastName;
  if (firstName !== contact.firstName && lastName !== contact.lastName) {
    return `${firstName} ${lastName} (${contact.firstName} ${contact.lastName})`;
  } else {
    return `${firstName} ${lastName}`;
  }
};

export const getFormattedNameFromUser = user => {
  return `${user.firstName} ${user.lastName}`;
};
export const getFormattedNameFromEventPhone = eventPhone => {
  return `${eventPhone.firstName} ${eventPhone.lastName} (${eventPhone.phone})`;
};

export const getEventPhoneFromUser = user => {
  return {
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName
  };
};
export const getEventPhoneFromContact = contact => {
  return {
    phone: contact.phone,
    firstName: contact.firstName,
    lastName: contact.lastName
  };
};
export const getFormattedMessageTime = timeString => {
  if (!timeString) return timeString;
  const time = moment(timeString);
  if (time > moment().subtract(5, "second")) return "now";
  return time.fromNow();
};

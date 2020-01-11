import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import moment from "moment";
import { minPasswordLength } from "./constants";

export const formatPhone = phone => {
  const phoneParsed = parsePhoneNumberFromString(phone, "US");
  return phoneParsed.country === "US"
    ? phoneParsed.formatNational()
    : phoneParsed.formatInternational();
};

export const getFormattedNameFromContact = contact => {
  const user = null;
  const firstName = user ? user.firstName : contact.firstName;
  const lastName = user ? user.lastName : contact.lastName;
  if (firstName !== contact.firstName && lastName !== contact.lastName) {
    return `${firstName} ${lastName} (${contact.firstName} ${contact.lastName})`;
  } else {
    return `${firstName} ${lastName}`;
  }
};

export function parsePhoneTyping({ text, previousText }) {
  const parsed = parsePhoneNumberFromString(text, "US");
  const isValidPhone = !!parsed && parsed.isValid();
  const isBackspace = text.length < previousText.length;
  const phone = isBackspace ? text : new AsYouType("US").input(text);
  const fullPhone = isValidPhone ? parsed.format("E.164") : null;
  return { phone, isValidPhone, fullPhone };
}

export function validatePasswordChoice(password) {
  const tooShort = password.length < minPasswordLength;
  const tooSimple = password.match(/^([A-Za-z]+|\d+)$/);
  const error = !password.length
    ? null
    : tooShort
    ? "At least 8 characters please"
    : tooSimple
    ? "Include numbers or other characters please"
    : null;

  return { tooShort, tooSimple, error };
}
export const getFormattedNameFromUser = user => {
  return `${user.firstName} ${user.lastName}`;
};
export const getFormattedNameFromEventPhone = eventPhone => {
  return `${eventPhone.firstName} ${eventPhone.lastName} (${eventPhone.phone})`;
};

export const generateEventPhoneFromUser = user => {
  return {
    phone: user.phone,
    firstName: user.firstName,
    lastName: user.lastName
  };
};
export const generateEventPhoneFromContact = contact => {
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

export function getKidsContacts(user) {
  let contacts = [];
  for (const myContact of user.contacts.items) {
    if (myContact.type !== "kid") continue;
    const userForMyKid = myContact.usersByPhone.items[0];
    if (!userForMyKid) continue; // this kid never signed up
    contacts.push(userForMyKid.contacts.items.filter(c => c.type === "friend"));
  }
  return contacts.flat();
}

export function truncate(text, n, useWordBoundary) {
  if (!text) return text;
  if (text.length <= n) {
    return text;
  }
  var subString = text.substr(0, n - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "…"
  );
}

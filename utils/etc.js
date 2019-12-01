import { parsePhoneNumberFromString } from "libphonenumber-js";

export const formatPhone = phone => {
  const phoneParsed = parsePhoneNumberFromString(phone, "US");
  return phoneParsed.country === "US"
    ? phoneParsed.formatNational()
    : phoneParsed.formatInternational();
};

const { Expo } = require("expo-server-sdk");
const { get } = require("lodash");
const moment = require("moment");
var AWS = require("aws-sdk");

require("isomorphic-fetch");
const Auth = require("@aws-amplify/auth").default;
const AWSAppSyncClient = require("aws-appsync").default; // because aws-amplify client still doesn't work right with nodeJs
const gql = require("graphql-tag");
const queries = require("./queries");
const mutations = require("./mutations");
const awsConfig = require("./aws-exports").default;
const credentials = require("./credentials").default;

const maxHoursToSendAfterMessageCreation = 24;

// todo:
// limit by time of day?

Auth.configure(awsConfig);
AWS.config.region = "us-east-1";

exports.processContacts = async function() {
  const { appSyncClient, error: appsSyncError } = await generateAppsyncClient();
  if (appsSyncError) return { error: appsSyncError };
  const { error, contacts } = await getContactsToInvite({ appSyncClient });
  const { error: sendError, errorDetails } = await sendInvitationsToContacts({
    appSyncClient,
    contacts
  });
  if (sendError) {
    return { error: sendError, errorDetails };
  }
  return {};
};

const getContactsToInvite = async function({ appSyncClient }) {
  const { contacts, error } = await getContactsNeedingInvations({
    appSyncClient
  });
  if (error) return { error };
  // console.log(contacts, `${contacts.length} total`);
  if (error) {
    console.log("error from contactsNeedingInvitations", error);
    return { error };
  }
  return { contacts };
};

const sendInvitationsToContacts = async function({ appSyncClient, contacts }) {
  console.log(`Sending invitations to ${contacts.length} contacts.`);
  let errorDetails = [];
  for (const contact of contacts) {
    const { createdAt, phone } = contact;
    const createdAtTime = moment(createdAt);
    // console.log("fromnow", createdAtTime.fromNow());
    if (
      !createdAt ||
      createdAtTime <
        moment().subtract(maxHoursToSendAfterMessageCreation, "hours")
    ) {
      const error = `skipping contact with phone ${phone} because contact.createdAt is old: ${createdAtTime.format()}`;
      errorDetails.push({ phone, text, error });
      continue;
    }
    const { firstName, lastName } = contact.user;
    const text = `${firstName} ${lastName} added you as a contact on the free mobile app called Village Keep: http://villagekeep.com`;
    const { error } = await sendInvitation({ phone, text });
    if (error) errorDetails.push({ phone, text, error });
    const { error: updateError } = await updateContact({
      appSyncClient,
      input: { id: contact.id, invitationStatus: "sent" }
    });
    if (updateError) {
      errorDetails.push({ phone, text, error: updateError });
    }
  }
  if (errorDetails.length)
    return {
      error: "At least one message failed. See errorDetails.",
      errorDetails
    };
  return {};
};

async function sendInvitation({ phone, text }) {
  console.log(`Sending invite to ${phone} with text: ${text}`);
  var sns = new AWS.SNS();
  const params = {
    Message: text,
    MessageStructure: "string",
    PhoneNumber: phone
  };
  try {
    const data = await sns.publish(params).promise();
    // console.log("data", data);
    return {};
  } catch (e) {
    console.log("error", e);
    return { error: e };
  }
}
exports.sendInvitation = sendInvitation;

async function getContactsNeedingInvations({ appSyncClient }) {
  try {
    // const fromTime = moment().subtract(1, "day");
    const toTime = moment().subtract(20, "minutes");
    const res = await appSyncClient.query({
      query: gql(queries.contactsNeedingInvitations),
      variables: {
        invitationStatus: "unsent",
        createdAt: { lt: toTime.toISOString() },
        sortDirection: "DESC",
        limit: 500
      }
    });
    return { contacts: res.data.contactsByInvitationStatus.items };
  } catch (e) {
    console.log("error from getContactsNeedingInvations", e);
    return { error: e };
  }
}

// async function updateContact(contactInput) {
//   try {
//     const res = await API.graphql(
//       graphqlOperation(mutations.updateContact, { input: contactInput })
//     );
//     return { contact: res.data.updateContact };
//   } catch (e) {
//     console.log(e);
//     return {
//       error: `Error saving contact record: ${get(e, "errors[0].message")}`
//     };
//   }
// }

async function updateContact({ appSyncClient, input }) {
  // async function updateContact({ appSyncClient, contactId }) {
  try {
    const res = await appSyncClient.mutate({
      mutation: gql(mutations.updateContact),
      variables: { input }
    });
    return { contact: res.data.updateContact };
  } catch (e) {
    console.log("error from updatecontact", e.graphQLErrors[0].locations);
    return { error: e };
  }
}

//// useful for other lambdas also:

async function generateCognitoToken() {
  try {
    await Auth.signIn(credentials.username, credentials.password);
  } catch (error) {
    return { error: `Error signing in: ${error}` };
  }
  const cognitoUser = await Auth.currentAuthenticatedUser();
  return { cognitoToken: cognitoUser.signInUserSession.accessToken.jwtToken };
}

async function generateAppsyncClient() {
  const { cognitoToken, error } = await generateCognitoToken();
  if (error) return { error };
  const appSyncClientConfig = {
    url: awsConfig.aws_appsync_graphqlEndpoint,
    region: awsConfig.aws_project_region,
    auth: {
      type: awsConfig.aws_appsync_authenticationType,
      jwtToken: cognitoToken
    },
    disableOffline: true
  };
  const appSyncClient = new AWSAppSyncClient(appSyncClientConfig);
  return { appSyncClient };
}

const { Expo } = require("expo-server-sdk");
const { get } = require("lodash");
require("isomorphic-fetch");
const Auth = require("@aws-amplify/auth").default;
const AWSAppSyncClient = require("aws-appsync").default;
const gql = require("graphql-tag");
const queries = require("./queries");
const awsConfig = require("./aws-exports").default;
Auth.configure(awsConfig);

exports.getTokensForEvent = async function({ eventId, excludeUserId }) {
  const { eventPhones, error } = await geteventPhonesByEvent({ eventId });
  if (error) {
    console.log("error from geteventphonesbyevent", error);
    return { error };
  }
  let pushTokens = [];

  let users = [];
  for (const eventPhone of eventPhones) {
    if (!eventPhone.event) {
      console.log(`No event for eventphone ${eventPhone.id}`);
      continue;
    }
    const eventType = eventPhone.event.type;
    const user = eventPhone.usersByPhone.items[0];

    if (!user) continue;

    if (user.isParent) {
      console.error(
        `User ${user.id}/${user.phone} is a parent but in eventPhone. Maybe toggled from kid status?`
      );
      continue;
    }
    if (eventType === "kids" || eventType === "both") {
      // include the kid
      users.push(user);
    }
    if (eventType === "parents" || eventType === "both") {
      // include the parents
      const parentContacts = user.contacts.items.filter(
        c => c.type === "parent"
      );
      const parentUsers = parentContacts
        .map(c => c.usersByPhone.items[0])
        .filter(u => u);
      if (parentUsers.length) users.push(...parentUsers);
    }
  }

  for (const user of users) {
    if (!user) {
      console.error(`users includes undefined element`);
      continue;
    }
    if (!user || user.deletedAt || !user.pushEnabled) continue;
    if (!user.pushToken) {
      // todo: handle this error
      console.error(`User ${user.id} has pushEnabled but no pushToken`);
      continue;
    }
    if (user.id === excludeUserId) continue;
    console.log(`found user ${user.phone} with token ${user.pushToken}`);
    pushTokens.push(user.pushToken);
  }
  return { pushTokens };
};

exports.sendNotifications = async function({ pushTokens, eventId, text }) {
  let expo = new Expo();

  let messages = [];
  for (let pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
    messages.push({
      to: pushToken,
      sound: "default",
      body: "<Reply> " + text,
      data: { eventId }
    });
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  return {};
};

async function geteventPhonesByEvent({ eventId }) {
  const { appSyncClient, error } = await generateAppsyncClient();
  if (error) return { error };
  const res = await appSyncClient.query({
    query: gql(queries.eventPhonesByEvent),
    variables: { eventId, limit: 500 }
  });
  return { eventPhones: res.data.eventPhonesByEvent.items };
}

async function generateCognitoToken() {
  try {
    await Auth.signIn("+12678086023", "testtest1");
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

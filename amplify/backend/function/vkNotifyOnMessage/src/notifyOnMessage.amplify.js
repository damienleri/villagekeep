const { Expo } = require("expo-server-sdk");
const Amplify = require("@aws-amplify/core").default;
// use @aws-amplify/api@1.2.2 otherwise a bug with API.graphql (“adapter is not a function”)
const { default: API, graphqlOperation } = require("@aws-amplify/api");
const Auth = require("@aws-amplify/auth").default;
const { get } = require("lodash");
const queries = require("./queries");
const awsConfig = require("./aws-exports").default;

// const awsConfig = {
//   aws_appsync_graphqlEndpoint:
//     "https://bsdkppdmhjgbridj5sx4fsqrfi.appsync-api.us-east-1.amazonaws.com/graphql",
//   aws_appsync_region: "us-east-1",
//   aws_appsync_authenticationType: "API_KEY",
//   // aws_appsync_authenticationType: "AWS_IAM",
//   aws_appsync_apiKey: "da2-2nquidldjfb4daoh3nu2m5tpim"
// };
global.fetch = require("node-fetch");
Amplify.configure(awsConfig);
Auth.configure(awsConfig);
API.configure(awsConfig);

async function geteventPhonesByEvent({ eventId }) {
  try {
    await Auth.signIn("+12678086023", "testtest1");
  } catch (error) {
    return { error: `Error signing in: ${error}` };
  }
  // console.log(await Auth.currentAuthenticatedUser());
  try {
    const res = await API.graphql(
      // graphqlOperation(queries.listUsers)
      graphqlOperation(queries.eventPhonesByEvent, { eventId, limit: 500 })
    );
    console.log("res", res);
    return { eventPhones: res.data.eventPhonesByEvent };
  } catch (e) {
    console.log(e);
    return {
      error: `Error getting eventPhones: ${get(e, "errors[0].message")}`
    };
  }
}

exports.getTokensForEvent = async function({ eventId, excludeUserId }) {
  const { eventPhones, error } = await geteventPhonesByEvent({ eventId });
  if (error) {
    console.log("error from geteventphonesbyevent", error);
    return { error };
  }
  let pushTokens = [];
  for (const eventPhone of eventPhones) {
    const user = eventPhone.usersByPhone.items[0];
    if (user && !user.deletedAt && user.pushEnabled) {
      if (!user.pushToken) {
        // todo: handle
        console.error(`User ${user.id} has pushEnabled but no pushToken`);
        continue;
      }
      if (user.id === excludeUserId) continue;
      pushTokens.push(user.pushToken);
    }
  }
  // const pushTokens = ["ExponentPushToken[E9TwZxLmNHaIqMYmHxKdZF]"]; //damien's token
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

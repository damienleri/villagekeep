const { Expo } = require("expo-server-sdk");
const Amplify = require("@aws-amplify/core");
const API = require("@aws-amplify/api");

const awsConfig = {
  aws_appsync_graphqlEndpoint:
    "https://xxxxxx.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-xxxxxxxxxxxxxxxxxxxxxxxxxx"
};

exports.getTokensForEvent = async function({ eventId }) {
  const pushTokens = ["ExponentPushToken[E9TwZxLmNHaIqMYmHxKdZF]"]; //damien's token
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
    }
  }
};

const { sendNotifications } = require("./notifyOnMessage");

exports.handler = async event => {
  const pushTokens = ["ExponentPushToken[E9TwZxLmNHaIqMYmHxKdZF]"]; //damien's token

  const message = event.Records[0].dynamodb.NewImage;

  const eventId = message.eventId.S;
  const text = message.text.S;

  await sendNotifications({ pushTokens, eventId, text });

  return { statusCode: 200, body: "ok" };
};

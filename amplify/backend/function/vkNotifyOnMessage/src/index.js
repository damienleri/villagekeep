const { getTokensForEvent, sendNotifications } = require("./notifyOnMessage");

exports.handler = async event => {
  const message = event.Records[0].dynamodb.NewImage;
  const eventId = message.eventId.S;
  const userId = message.userId.S;
  const text = message.text.S;

  const { pushTokens, error } = await getTokensForEvent({
    eventId,
    excludeUserId: userId
  });

  if (error) return { statusCode: 500, body: `Error getting tokens: ${error}` };

  const { error: sendError } = await sendNotifications({
    pushTokens,
    eventId,
    text
  });
  if (sendError)
    return {
      statusCode: 500,
      body: `Error sending notifications: ${sendError}`
    };

  return { statusCode: 200, body: "ok" };
};

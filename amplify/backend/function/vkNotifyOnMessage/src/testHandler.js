const { getTokensForEvent, sendNotifications } = require("./notifyOnMessage");

(async () => {
  const eventId = "41ad84c8-aa7d-493f-b9a6-9d0d739a40e1";
  const { pushTokens, error } = await getTokensForEvent({ eventId });
  const text = "test from testPush.js";
  await sendNotifications({ pushTokens, eventId, text });
})();

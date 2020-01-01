const { getTokensForEvent, sendNotifications } = require("./notifyOnMessage");

(async () => {
  const eventId = "41ad84c8-aa7d-493f-b9a6-9d0d739a40e1";
  // const userId = "53963b29-ec3e-492d-b0f7-5c249fc6f9f6";
  const userId = "09";
  const { pushTokens, error } = await getTokensForEvent({
    eventId,
    excludeUserId: userId
  });
  console.log("pushtokens", pushTokens);
  const text = "test from testPush.js";
  const { error: sendError } = await sendNotifications({
    pushTokens,
    eventId,
    text
  });
})();

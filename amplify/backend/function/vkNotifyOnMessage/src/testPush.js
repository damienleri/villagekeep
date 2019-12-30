const { sendNotifications } = require("./notifyOnMessage");
(async () => {
  const pushTokens = ["ExponentPushToken[E9TwZxLmNHaIqMYmHxKdZF]"]; //damien's token
  const eventId = 99;
  const text = "test from testPush.js";
  await sendNotifications({ pushTokens, eventId, text });
})();

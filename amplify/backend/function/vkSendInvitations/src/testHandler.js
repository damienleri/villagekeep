const { processContacts } = require("./invitations");

(async () => {
  const { error, errorDetails } = await processContacts();
  if (error) {
    console.log("aborted due to error", error, errorDetails);
    return;
  }
})();

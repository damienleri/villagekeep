const { getInvitationsToSend, sendInvitations } = require("./invitations");

(async () => {
  const { error, invitations } = await getInvitationsToSend();

  const { error: sendError } = await sendInvitations({ invitations });
  if (sendError) console.log("senderror", sendError);
})();

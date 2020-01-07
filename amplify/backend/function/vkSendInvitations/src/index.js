const { getInvitationsToSend, sendInvitations } = require("./invitations");

exports.handler = async (event, context) => {
  const { error, invitations } = await getInvitationsToSend();
  const { error: sendError } = await sendInvitations({ invitations });
  if (sendError)
    return {
      statusCode: 500,
      body: `Error sending invitation: ${sendError}`
    };

  return { statusCode: 200, body: "ok" };
};

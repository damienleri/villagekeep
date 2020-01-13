const { processContacts } = require("./invitations");

exports.handler = async (event, context) => {
  const { error, errorDetails } = await processContacts();
  if (error)
    return {
      statusCode: 500,
      body:
        `Error sending invitation: ${sendError}.` + JSON.stringify(errorDetails)
    };

  return { statusCode: 200, body: "ok" };
};

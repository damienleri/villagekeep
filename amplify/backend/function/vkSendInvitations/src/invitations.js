const { Expo } = require("expo-server-sdk");
const { get } = require("lodash");
require("isomorphic-fetch");
const Auth = require("@aws-amplify/auth").default;
const AWSAppSyncClient = require("aws-appsync").default;
const gql = require("graphql-tag");
const queries = require("./queries");
const awsConfig = require("./aws-exports").default;
const credentials = require("./credentials").default;
Auth.configure(awsConfig);

exports.getInvitationsToSend = async function({}) {
  const { appSyncClient, error: appsSyncError } = await generateAppsyncClient();
  if (appsSyncError) return { error: appsSyncError };

  const { eventPhones, error } = await geteventPhonesByEvent({ appSyncClient });
  if (error) {
    console.log("error from geteventphonesbyevent", error);
    return { error };
  }
};

exports.sendInvitations = async function({}) {};

async function geteventPhonesByEvent({ appSyncClient }) {
  const res = await appSyncClient.query({
    query: gql(queries.eventPhonesByEvent),
    variables: { eventId, limit: 500 }
  });
  return { eventPhones: res.data.eventPhonesByEvent.items };
}

//// useful for other lambdas also:

async function generateCognitoToken() {
  try {
    await Auth.signIn(credentials.username, credentials.password);
  } catch (error) {
    return { error: `Error signing in: ${error}` };
  }
  const cognitoUser = await Auth.currentAuthenticatedUser();
  return { cognitoToken: cognitoUser.signInUserSession.accessToken.jwtToken };
}

async function generateAppsyncClient() {
  const { cognitoToken, error } = await generateCognitoToken();
  if (error) return { error };
  const appSyncClientConfig = {
    url: awsConfig.aws_appsync_graphqlEndpoint,
    region: awsConfig.aws_project_region,
    auth: {
      type: awsConfig.aws_appsync_authenticationType,
      jwtToken: cognitoToken
    },
    disableOffline: true
  };
  const appSyncClient = new AWSAppSyncClient(appSyncClientConfig);
  return { appSyncClient };
}

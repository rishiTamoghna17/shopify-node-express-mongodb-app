import zendesk from "node-zendesk";

export const client = zendesk.createClient({
  username:process.env.zendesk_username,
  token: process.env.zendesk_api_token,
  remoteUri: process.env.zendesk_remote_Uri,
});

export default client;

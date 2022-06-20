import * as httpm from '@actions/http-client';
import * as authModule from '@actions/http-client/lib/auth';

export const createHttpClient = (authToken: string): httpm.HttpClient => {
  const auth: authModule.BearerCredentialHandler = new authModule.BearerCredentialHandler(authToken);
  const http: httpm.HttpClient = new httpm.HttpClient('gantry-deploy-action', [auth], {
    headers: {
      // might be set by postJson | getJson
      // Accept: 'application/json',
      // 'Content-Type': 'application/json'
    }
  });

  return http;
};

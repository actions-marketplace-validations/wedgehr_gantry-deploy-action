import core from '@actions/core';
import httpm from '@actions/http-client';
import { getInputs } from './context';
import { createHttpClient } from './http';

interface DeployData extends httpm.HttpClientResponse {
  success: boolean;
}

export const main = async (): Promise<void> => {
  const ctx = getInputs();
  core.setSecret(ctx.gantryToken);
  core.info(`deploying tag version{${ctx.deployTag}} to service group{${ctx.deployGroup}}`);

  const urlDeploy = 'https://' + ctx.gantryHost + '/deploy';
  const http = createHttpClient(ctx.gantryToken);
  const res = await http.postJson<DeployData>(urlDeploy, {
    group: ctx.deployGroup,
    version: ctx.deployTag
  });

  core.debug(`gantry response: Status{${res.statusCode}}`);

  if (res.result?.success !== true) {
    core.error('gantry deployment unsuccessful');
    throw new Error('gantry deployment unsuccessful');
  }

  core.info('successful deployment');
};

// Call the main function to run the action
try {
  main();
} catch (error) {
  core.setFailed(error.message);
}

import core from '@actions/core';
import httpm from '@actions/http-client';
import { createHttpClient } from './http';

interface DeployData extends httpm.HttpClientResponse {
  success: boolean;
}

const main = async () => {
  const deployTag = core.getInput('deploy-tag', { required: true });
  const deployGroup = core.getInput('deploy-group', { required: true });
  const gantryHost = core.getInput('gantry-host', { required: true });
  const gantryToken = core.getInput('gantry-token', { required: true });

  const urlDeploy = gantryHost + '/deploy';

  const http = createHttpClient(gantryToken);

  core.info(`deploying tag version{${deployTag}} to service group{${deployGroup}}`);

  const res = await http.postJson<DeployData>(urlDeploy, {
    group: deployGroup,
    version: deployTag
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

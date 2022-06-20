import * as core from '@actions/core';

export interface Inputs {
  deployTag: string;
  deployGroup: string;
  gantryHost: string;
  gantryToken: string;
}

export const getInputs = (): Inputs => ({
  deployTag: core.getInput('deploy-tag', { required: true }),
  deployGroup: core.getInput('deploy-group', { required: true }),
  gantryHost: core.getInput('gantry-host', { required: true }),
  gantryToken: core.getInput('gantry-token', { required: true })
});


const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  globalSetup: './test/database.setup.ts',
  //globalTeardown: './test/database.teardown.ts',
};

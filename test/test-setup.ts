/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = 'localhost';
  const port = process.env["BACKEND_PORT"] ?? '4000';
  axios.defaults.baseURL = `http://${host}:${port}/api`;
};

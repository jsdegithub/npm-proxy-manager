const { PROXY, HTTPSPROXY, HTTP, HTTPS } = require('../util/constants');
const {
  getCurrentProxy,
  getCurrentHTTPSProxy,
  getCurrentRegistry,
  geneDashLine,
  printMessage,
  printError,
} = require('../util/helpers');
const fetch = require('node-fetch');
const chalk = require('chalk');

async function testProxy() {
  let time = 0;
  let status = false;
  let isTimeout = false;
  const timeout = 5000;
  const start = Date.now();
  const currentRegistry = await getCurrentRegistry();

  if (!currentRegistry) {
    printError('Please set the registry first.');
    return;
  }
  if (!currentRegistry.includes(HTTP) && !currentRegistry.includes(HTTPS)) {
    printError('Invalid registry format.');
    return;
  }

  try {
    const response = await fetch(currentRegistry + 'npm-proxy-manager', {
      timeout,
    });
    status = response.ok;
  } catch (error) {
    isTimeout = error.type === 'request-timeout';
  }
  time = Date.now() - start;

  let suffix = isTimeout ? 'timeout' : `${time} ms`;
  const timeoutMsg = chalk.yellow(` (Fetch timeout over ${timeout} ms)`);
  const errorMsg = chalk.red(
    ' (Fetch error, please check the proxy or registry)'
  );
  const success = status;
  if (!success) {
    suffix += isTimeout ? timeoutMsg : errorMsg;
  }

  const separator = geneDashLine();
  const registryType = currentRegistry.includes(HTTPS) ? HTTPS : HTTP;
  const currentProxy = await getCurrentProxy();
  const currentHTTPSProxy = await getCurrentHTTPSProxy();
  const prefix =
    registryType === HTTPS
      ? chalk.blue(`[${HTTPSPROXY}] `)
      : chalk.blue(`[${PROXY}] `);
  const proxy = registryType === HTTPS ? currentHTTPSProxy : currentProxy;
  const message = `${prefix}${proxy}${separator}${suffix}`;

  printMessage(message);
}

module.exports = testProxy;

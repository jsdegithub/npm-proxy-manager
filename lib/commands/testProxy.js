const {
  getProxies,
  getCurrentProxy,
  getCurrentRegistry,
  geneDashLine,
  printMessage,
} = require('../util/helpers');
const { PROXY } = require('../util/constants');
const fetch = require('node-fetch');
const chalk = require('chalk');

async function testProxy() {
  let time = 0;
  let status = false;
  let isTimeout = false;
  const timeout = 5000;
  const start = Date.now();
  const currentRegistry = await getCurrentRegistry();

  try {
    const response = await fetch(currentRegistry + 'npm-proxy-manager', {
      timeout,
    });
    status = response.ok;
  } catch (error) {
    isTimeout = error.type === 'request-timeout';
  }
  time = Date.now() - start;

  let currentProxyName = '';
  const currentProxy = await getCurrentProxy();
  const proxies = await getProxies();
  Object.keys(proxies).forEach((key) => {
    const proxy = proxies[key];
    if (proxy[PROXY] === currentProxy) {
      currentProxyName = key;
    }
  });

  const timeoutMsg = chalk.yellow(` (Fetch timeout over ${timeout} ms)`);
  const errorMsg = chalk.red(
    ' (Fetch error, please check the proxy or registry)'
  );

  const prefix = chalk.green('* ');
  let suffix = isTimeout ? 'timeout' : `${time} ms`;
  const success = status;
  if (!success) {
    suffix += isTimeout ? timeoutMsg : errorMsg;
  }

  const proxySeparator = geneDashLine(
    currentProxyName,
    currentProxyName.length + 3
  );
  const errorSeparator = geneDashLine();

  const message = `${prefix}${currentProxyName}${proxySeparator}${currentProxy}${errorSeparator}${suffix}`;

  printMessage(message);
}

module.exports = testProxy;

const fs = require('fs');
const chalk = require('chalk');

const {
  geneDashLine,
  printMessages,
  getCurrentProxy,
  getCurrentHTTPSProxy,
  getProxies,
  isLowerCaseEqual,
} = require('../util/helpers');

const { NPMRC, PROXY, HTTPSPROXY } = require('../util/constants');

async function listProxy({ proxy, httpsProxy }) {
  if (!fs.existsSync(NPMRC)) {
    console.error('No .npmrc file found at the user config location.');
    return;
  }

  const currentProxy = await getCurrentProxy();
  const currentHTTPSProxy = await getCurrentHTTPSProxy();
  const proxies = await getProxies();
  const keys = Object.keys(proxies);
  const length = Math.max(...keys.map((key) => key.length)) + 3;

  const messages = keys.map((key) => {
    const proxy = proxies[key];
    const prefix = isLowerCaseEqual(proxy[PROXY], currentProxy)
      ? chalk.green.bold('* ')
      : '  ';
    return (
      prefix +
      key +
      geneDashLine(key, length) +
      chalk.blue(`[${PROXY}] `) +
      proxy[PROXY] +
      geneDashLine(key, length + key.length) +
      chalk.blue(`[${HTTPSPROXY}] `) +
      proxy[HTTPSPROXY]
    );
  });

  printMessages(messages);
}

module.exports = listProxy;

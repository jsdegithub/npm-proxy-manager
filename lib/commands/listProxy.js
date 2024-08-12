const fs = require('fs');
const chalk = require('chalk');

const {
  exit,
  readFile,
  writeFile,
  geneDashLine,
  printMessages,
  printSuccess,
  getCurrentProxy,
  getProxies,
  isLowerCaseEqual,
  isRegistryNotFound,
  isInternalRegistry,
} = require('../util/helpers');

const {NPRC, NPMRC, AUTH, EMAIL, ALWAYS_AUTH, REPOSITORY, PROXY, HOME} = require('../util/constants');

async function listProxy() {
  if (!fs.existsSync(NPMRC)) {
    console.error('No .npmrc file found at the user config location.');
    return;
  }

  const currentProxy = await getCurrentProxy();
  const proxies = await getProxies();
  const keys = Object.keys(proxies);
  const length = Math.max(...keys.map((key) => key.length)) + 3;

  const messages = keys.map((key) => {
    const proxy = proxies[key];
    const prefix = isLowerCaseEqual(proxy[PROXY], currentProxy) ? chalk.green.bold('* ') : '  ';
    return prefix + key + geneDashLine(key, length) + proxy[PROXY];
  });

  printMessages(messages);
}

module.exports = (...args) => {
  listProxy(...args);
};

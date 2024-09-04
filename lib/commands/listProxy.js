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

  const all = (!proxy && !httpsProxy) || (proxy && httpsProxy);
  const currentProxy = await getCurrentProxy();
  const currentHTTPSProxy = await getCurrentHTTPSProxy();
  const proxies = await getProxies();
  const keys = Object.keys(proxies);
  const length = Math.max(...keys.map((key) => key.length)) + 3;

  const messages = keys.map((key) => {
    const proxyObj = proxies[key];

    let prefix = '';
    if (all) {
      prefix =
        isLowerCaseEqual(proxyObj[PROXY], currentProxy) &&
        isLowerCaseEqual(proxyObj[HTTPSPROXY], currentHTTPSProxy)
          ? chalk.green.bold('* ')
          : '  ';
    }
    if (proxy) {
      prefix = isLowerCaseEqual(proxyObj[PROXY], currentProxy)
        ? chalk.green.bold('* ')
        : '  ';
    }
    if (httpsProxy) {
      prefix = isLowerCaseEqual(proxyObj[HTTPSPROXY], currentHTTPSProxy)
        ? chalk.green.bold('* ')
        : '  ';
    }

    let output = '';
    if (all) {
      output = `${prefix}${key}${geneDashLine(key, length)}${chalk.blue(
        `[${PROXY}] `
      )}${proxyObj[PROXY]}${geneDashLine(key, length + key.length)}${chalk.blue(
        `[${HTTPSPROXY}] `
      )}${proxyObj[HTTPSPROXY]}`;
      return output;
    }
    if (proxy) {
      output = `${prefix}${key}${geneDashLine(key, length)}${proxyObj[PROXY]}`;
      return output;
    }
    if (httpsProxy) {
      output = `${prefix}${key}${geneDashLine(key, length)}${
        proxyObj[HTTPSPROXY]
      }`;
      return output;
    }
  });

  printMessages(messages);
}

module.exports = listProxy;

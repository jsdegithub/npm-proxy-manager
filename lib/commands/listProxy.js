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
  const maxKeyLength = Math.max(...keys.map((key) => key.length));
  const maxURLLength = Math.max(
    ...keys.map((key) => proxies[key][PROXY].length)
  );

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
      output = `${prefix}${key}${geneDashLine(key, maxKeyLength)}${chalk.blue(
        `[${PROXY}] `
      )}${
        isLowerCaseEqual(proxyObj[PROXY], currentProxy)
          ? chalk.green(proxyObj[PROXY])
          : proxyObj[PROXY]
      }${geneDashLine(proxyObj[PROXY], maxURLLength)}${chalk.blue(
        `[${HTTPSPROXY}] `
      )}${
        isLowerCaseEqual(proxyObj[HTTPSPROXY], currentHTTPSProxy)
          ? chalk.green(proxyObj[HTTPSPROXY])
          : proxyObj[HTTPSPROXY]
      }`;
      return output;
    }
    if (proxy) {
      output = `${prefix}${key}${geneDashLine(key, maxKeyLength)}${
        isLowerCaseEqual(proxyObj[PROXY], currentProxy)
          ? chalk.green(proxyObj[PROXY])
          : proxyObj[PROXY]
      }`;
      return output;
    }
    if (httpsProxy) {
      output = `${prefix}${key}${geneDashLine(key, maxKeyLength)}${
        isLowerCaseEqual(proxyObj[HTTPSPROXY], currentHTTPSProxy)
          ? chalk.green(proxyObj[HTTPSPROXY])
          : proxyObj[HTTPSPROXY]
      }`;
      return output;
    }
  });

  printMessages(messages);
}

module.exports = listProxy;

const fs = require('fs');
const chalk = require('chalk');

const {
  geneDashLine,
  printMessage,
  printMessages,
  printError,
  getCurrentProxy,
  getCurrentHTTPSProxy,
  getProxies,
  isLowerCaseEqual,
} = require('../util/helpers');

const { NPMRC, PROXY, HTTPSPROXY } = require('../util/constants');

async function listProxy({ proxy, httpsProxy }) {
  if (!fs.existsSync(NPMRC)) {
    printError('No .npmrc file found at the user config location.');
    return;
  }

  const all = (!proxy && !httpsProxy) || (proxy && httpsProxy);
  const currentProxy = await getCurrentProxy();
  const currentHTTPSProxy = await getCurrentHTTPSProxy();
  const proxies = await getProxies();
  const keys = Object.keys(proxies);
  const maxKeyLength = Math.max(...keys.map((key) => key.length));
  const maxURLLength = Math.max(
    ...keys.map((key) => {
      const url = proxies[key][PROXY];
      return url ? url.length : String(url).length;
    })
  );

  if (keys.length === 0) {
    printMessage(chalk.yellow('You have no custom proxies.'));
    return;
  }

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
        currentProxy && isLowerCaseEqual(proxyObj[PROXY], currentProxy)
          ? chalk.green.bold(proxyObj[PROXY])
          : proxyObj[PROXY]
      }${geneDashLine(String(proxyObj[PROXY]), maxURLLength)}${chalk.blue(
        `[${HTTPSPROXY}] `
      )}${
        currentHTTPSProxy &&
        isLowerCaseEqual(proxyObj[HTTPSPROXY], currentHTTPSProxy)
          ? chalk.green.bold(proxyObj[HTTPSPROXY])
          : proxyObj[HTTPSPROXY]
      }`;
      return output;
    }
    if (proxy) {
      output = `${prefix}${key}${geneDashLine(key, maxKeyLength)}${
        currentProxy && isLowerCaseEqual(proxyObj[PROXY], currentProxy)
          ? chalk.green.bold(proxyObj[PROXY])
          : proxyObj[PROXY]
      }`;
      return output;
    }
    if (httpsProxy) {
      output = `${prefix}${key}${geneDashLine(key, maxKeyLength)}${
        currentHTTPSProxy &&
        isLowerCaseEqual(proxyObj[HTTPSPROXY], currentHTTPSProxy)
          ? chalk.green.bold(proxyObj[HTTPSPROXY])
          : proxyObj[HTTPSPROXY]
      }`;
      return output;
    }
  });

  printMessages(messages);
}

module.exports = listProxy;

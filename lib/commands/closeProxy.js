const { readFile, writeFile, printSuccess } = require('../util/helpers');
const {
  NPMRC,
  PROXY,
  HTTPSPROXY,
  DISABLEPREFIX,
} = require('../util/constants');
const chalk = require('chalk');

async function closeProxy({ proxy, httpsProxy }) {
  const npmrc = await readFile(NPMRC);
  const currentProxy = npmrc[PROXY] || npmrc[`${DISABLEPREFIX}${PROXY}`];
  const currentHttpsProxy =
    npmrc[HTTPSPROXY] || npmrc[`${DISABLEPREFIX}${HTTPSPROXY}`];
  const all = (!proxy && !httpsProxy) || (proxy && httpsProxy);

  const disableProxy = (key, currentValue) => {
    delete npmrc[key];
    npmrc[`${DISABLEPREFIX}${key}`] = currentValue;
  };

  if (all) {
    disableProxy(PROXY, currentProxy);
    disableProxy(HTTPSPROXY, currentHttpsProxy);
    await writeFile(NPMRC, npmrc);
    printSuccess(
      `The ${chalk.blue('http proxy')} and ${chalk.blue(
        'https proxy'
      )} have been disabled.`
    );
    return;
  }

  if (proxy) {
    disableProxy(PROXY, currentProxy);
    await writeFile(NPMRC, npmrc);
    printSuccess(`The ${chalk.blue('http proxy')} has been disabled.`);
    return;
  }

  if (httpsProxy) {
    disableProxy(HTTPSPROXY, currentHttpsProxy);
    await writeFile(NPMRC, npmrc);
    printSuccess(`The ${chalk.blue('https proxy')} has been disabled.`);
    return;
  }
}

module.exports = closeProxy;

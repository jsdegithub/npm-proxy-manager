const { readFile, writeFile, printSuccess } = require('../util/helpers');
const {
  NPMRC,
  PROXY,
  HTTPSPROXY,
  DISABLEPREFIX,
} = require('../util/constants');
const chalk = require('chalk');

async function openProxy({ proxy, httpsProxy }) {
  const npmrc = await readFile(NPMRC);
  const currentProxy = npmrc[`${DISABLEPREFIX}${PROXY}`] || npmrc[PROXY];
  const currentHttpsProxy =
    npmrc[`${DISABLEPREFIX}${HTTPSPROXY}`] || npmrc[HTTPSPROXY];
  const all = (!proxy && !httpsProxy) || (proxy && httpsProxy);

  const enableProxy = (key, value) => {
    delete npmrc[`${DISABLEPREFIX}${key}`];
    npmrc[key] = value;
  };

  if (all) {
    enableProxy(PROXY, currentProxy);
    enableProxy(HTTPSPROXY, currentHttpsProxy);
    await writeFile(NPMRC, npmrc);
    printSuccess(
      `The ${chalk.blue('http proxy')} and ${chalk.blue(
        'https proxy'
      )} have been enabled.`
    );
    return;
  }

  if (proxy) {
    enableProxy(PROXY, currentProxy);
    await writeFile(NPMRC, npmrc);
    printSuccess(`The ${chalk.blue('http proxy')} has been enabled.`);
    return;
  }

  if (httpsProxy) {
    enableProxy(HTTPSPROXY, currentHttpsProxy);
    await writeFile(NPMRC, npmrc);
    printSuccess(`The ${chalk.blue('https proxy')} has been enabled.`);
    return;
  }
}

module.exports = openProxy;

const { readFile, writeFile, printSuccess } = require('../util/helpers');
const {
  NPMRC,
  PROXY,
  HTTPSPROXY,
  DISABLEPREFIX,
} = require('../util/constants');
const chalk = require('chalk');

async function closeProxy() {
  const npmrc = await readFile(NPMRC);
  const currentProxy = npmrc[`${DISABLEPREFIX}${PROXY}`] || npmrc[PROXY];
  const currentHttpsProxy =
    npmrc[`${DISABLEPREFIX}${HTTPSPROXY}`] || npmrc[HTTPSPROXY];

  delete npmrc[`${DISABLEPREFIX}${PROXY}`];
  delete npmrc[`${DISABLEPREFIX}${HTTPSPROXY}`];

  const proxy = {
    [PROXY]: currentProxy,
    [HTTPSPROXY]: currentHttpsProxy,
  };
  await writeFile(NPMRC, Object.assign(npmrc, proxy));

  printSuccess(
    `The ${chalk.blue('http proxy')} and ${chalk.blue(
      'https proxy'
    )} has been enabled.`
  );
}

module.exports = closeProxy;

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
  const currentProxy = npmrc[PROXY] || npmrc[`${DISABLEPREFIX}${PROXY}`];
  const currentHttpsProxy =
    npmrc[HTTPSPROXY] || npmrc[`${DISABLEPREFIX}${HTTPSPROXY}`];

  delete npmrc[PROXY];
  delete npmrc[HTTPSPROXY];

  const proxy = {
    [`${DISABLEPREFIX}${PROXY}`]: currentProxy,
    [`${DISABLEPREFIX}${HTTPSPROXY}`]: currentHttpsProxy,
  };

  await writeFile(NPMRC, Object.assign(npmrc, proxy));

  printSuccess(
    `The ${chalk.blue('http proxy')} and ${chalk.blue(
      'https proxy'
    )} has been disabled.`
  );
}

module.exports = closeProxy;

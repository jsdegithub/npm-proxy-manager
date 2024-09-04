const {
  readFile,
  writeFile,
  printSuccess,
  getProxies,
  isProxyNotFound,
} = require('../util/helpers');
const {
  NPMRC,
  PROXY,
  HTTPSPROXY,
  DISABLEPREFIX,
} = require('../util/constants');
const chalk = require('chalk');

async function useProxy(name, { proxy, httpsProxy }) {
  if (await isProxyNotFound(name)) {
    printError(`The proxy '${name}' is not found.`);
    return;
  }

  const proxies = await getProxies();
  const proxyObj = proxies[name];
  const all = (!proxy && !httpsProxy) || (proxy && httpsProxy);

  if (proxy && !all) {
    delete proxyObj[HTTPSPROXY];
  }
  if (httpsProxy && !all) {
    delete proxyObj[PROXY];
  }

  const npmrc = await readFile(NPMRC);
  delete npmrc[`${DISABLEPREFIX}${PROXY}`];
  delete npmrc[`${DISABLEPREFIX}${HTTPSPROXY}`];

  await writeFile(NPMRC, Object.assign(npmrc, proxyObj));

  const output = all
    ? `The ${chalk.green('http proxy')} and ${chalk.green(
        'https proxy'
      )} has been changed to '${name}'.`
    : proxy
    ? `The ${chalk.green('http proxy')} has been changed to '${name}'.`
    : `The ${chalk.green('https proxy')} has been changed to '${name}'.`;
  printSuccess(output);
}

module.exports = useProxy;

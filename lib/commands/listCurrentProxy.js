const chalk = require('chalk');

const {
  printMessages,
  getCurrentProxy,
  getProxies,
  isLowerCaseEqual,
} = require('../util/helpers');

const { PROXY } = require('../util/constants');

async function listCurrentProxy({ showUrl }) {
  const currentProxy = await getCurrentProxy();
  let usingUnknownProxy = true;
  const proxies = await getProxies();

  if (!currentProxy) {
    printMessages([
      'You are not using any proxy.',
      `Use the ${chalk.green('npm-proxy use <proxy>')} command to use a proxy.`,
    ]);
    return;
  }
  for (const name in proxies) {
    const proxy = proxies[name];
    if (isLowerCaseEqual(proxy[PROXY], currentProxy)) {
      usingUnknownProxy = false;
      printMessages([
        `You are using ${chalk.green(showUrl ? proxy[PROXY] : name)} proxy.`,
      ]);
    }
  }
  if (usingUnknownProxy) {
    printMessages([
      `Your current proxy(${currentProxy}) is not included in the npm-proxy proxies.`,
      `Use the ${chalk.green(
        'npm-proxy add <proxy> <url>'
      )} command to add your proxy.`,
    ]);
  }
}

module.exports = listCurrentProxy;

const chalk = require('chalk');

const {
  printMessages,
  getCurrentProxy,
  getCurrentHTTPSProxy,
} = require('../util/helpers');

async function listCurrentProxy({ proxy, httpsProxy }) {
  const currentProxy = await getCurrentProxy();
  const currentHTTPSProxy = await getCurrentHTTPSProxy();

  if (proxy && !currentProxy) {
    printMessages([
      'You are not using any http proxy.',
      `Use the ${chalk.green(
        'npm-proxy use <proxy> -p'
      )} command to use a http proxy.`,
    ]);
    return;
  }
  if (httpsProxy && !currentHTTPSProxy) {
    printMessages([
      'You are not using any https proxy.',
      `Use the ${chalk.green(
        'npm-proxy use <proxy> -hp'
      )} command to use a https proxy.`,
    ]);
    return;
  }

  if (!proxy && !httpsProxy) {
    printMessages([
      `Current http proxy: ${chalk.green(currentProxy)}`,
      `Current https proxy: ${chalk.green(currentHTTPSProxy)}`,
    ]);
    return;
  }
  if (proxy) {
    printMessages([`Current http proxy: ${chalk.green(currentProxy)}`]);
  }
  if (httpsProxy) {
    printMessages([`Current https proxy: ${chalk.green(currentHTTPSProxy)}`]);
  }
}

module.exports = listCurrentProxy;

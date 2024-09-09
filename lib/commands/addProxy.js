const {
  readFile,
  writeFile,
  printSuccess,
  getProxies,
  exit,
} = require('../util/helpers');
const { NPRC, PROXY, HTTPSPROXY } = require('../util/constants');
const chalk = require('chalk');

async function addProxy(name, url, { proxy, httpsProxy }) {
  const proxies = await getProxies();
  const proxyNames = Object.keys(proxies);
  if (proxyNames.includes(name)) {
    return exit(
      `The proxy name ${chalk.green(
        name
      )} is already included in your custom proxies. Please make sure that the name are unique.`
    );
  }

  const newProxy = {};
  if (proxy) {
    newProxy[PROXY] = /\/$/.test(proxy) ? proxy : proxy + '/';
  }
  if (httpsProxy) {
    newProxy[HTTPSPROXY] = /\/$/.test(httpsProxy)
      ? httpsProxy
      : httpsProxy + '/';
  }
  if (!proxy && !httpsProxy) {
    newProxy[PROXY] = newProxy[HTTPSPROXY] = /\/$/.test(url) ? url : url + '/';
  }

  const customProxies = await readFile(NPRC);
  const newCustomProxies = Object.assign(customProxies, {
    [name]: newProxy,
  });
  await writeFile(NPRC, newCustomProxies);
  printSuccess(
    `Add proxy ${chalk.green(name)} success, run ${chalk.green(
      'npm-proxy use ' + name
    )} command to use ${name} proxy.`
  );
}

module.exports = addProxy;

const {
  readFile,
  writeFile,
  printSuccess,
  getProxies,
  exit,
} = require('../util/helpers');
const { NPRC, PROXY, HTTPSPROXY } = require('../util/constants');
const chalk = require('chalk');

async function setProxy(name, url) {
  const proxies = await getProxies();
  const proxyNames = Object.keys(proxies);
  if (!proxyNames.includes(name)) {
    return exit(
      'The proxy name is not included in the npm-proxy proxies. Please make sure that the name is correct.'
    );
  }

  const newProxy = {};
  newProxy[PROXY] = /\/$/.test(url) ? url : url + '/';
  newProxy[HTTPSPROXY] = /\/$/.test(url) ? url : url + '/';
  const customProxies = await readFile(NPRC);
  const newCustomProxies = Object.assign(customProxies, {
    [name]: newProxy,
  });
  await writeFile(NPRC, newCustomProxies);
  printSuccess(
    `Add proxy ${name} success, run ${chalk.green(
      'npm-proxy use ' + name
    )} command to use ${name} proxy.`
  );
}

module.exports = setProxy;

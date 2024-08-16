const {
  readFile,
  writeFile,
  printSuccess,
  getProxies,
  isLowerCaseEqual,
  exit,
} = require('../util/helpers');
const { NPRC, PROXY, HTTPSPROXY } = require('../util/constants');
const chalk = require('chalk');

async function addProxy(name, url, { proxy, httpsProxy }) {
  const proxies = await getProxies();
  const proxyNames = Object.keys(proxies);
  const proxyUrls = proxyNames.map((name) => proxies[name][PROXY]);
  const httpsProxyUrls = proxyNames.map((name) => proxies[name][HTTPSPROXY]);
  if (
    proxyNames.includes(name) ||
    proxyUrls.some((eachUrl) => isLowerCaseEqual(eachUrl, url))
  ) {
    return exit(
      'The proxy name or url is already included in the npm-proxy proxies. Please make sure that the name and url are unique.'
    );
  }

  const newProxy = {};
  if (proxy) {
    newProxy[PROXY] = /\/$/.test(url) ? url : url + '/';
  }
  if (httpsProxy) {
    newProxy[HTTPSPROXY] = /\/$/.test(url) ? url : url + '/';
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
    `Add proxy ${name} success, run ${chalk.green(
      'npm-proxy use ' + name
    )} command to use ${name} proxy.`
  );
}

module.exports = addProxy;

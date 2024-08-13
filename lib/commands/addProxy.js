const {
  readFile,
  writeFile,
  printSuccess,
  getProxies,
  isLowerCaseEqual,
  exit,
} = require('../util/helpers');
const { NPRC, PROXY, HTTPSPROXY, HOME } = require('../util/constants');
const chalk = require('chalk');

async function addProxy(name, url, home) {
  const proxies = await getProxies();
  const proxyNames = Object.keys(proxies);
  const proxyUrls = proxyNames.map((name) => proxies[name][PROXY]);
  if (
    proxyNames.includes(name) ||
    proxyUrls.some((eachUrl) => isLowerCaseEqual(eachUrl, url))
  ) {
    return exit(
      'The proxy name or url is already included in the npm-proxy proxies. Please make sure that the name and url are unique.'
    );
  }

  const newProxy = {};
  newProxy[PROXY] = /\/$/.test(url) ? url : url + '/';
  newProxy[HTTPSPROXY] = /\/$/.test(url) ? url : url + '/';
  if (home) {
    newProxy[HOME] = home;
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

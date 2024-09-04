const {
  writeFile,
  printSuccess,
  getProxies,
  exit,
} = require('../util/helpers');
const { NPRC, PROXY, HTTPSPROXY } = require('../util/constants');
const chalk = require('chalk');

async function setProxy(name, url, { proxy, httpsProxy }) {
  const proxies = await getProxies();
  const proxyNames = Object.keys(proxies);

  if (!proxyNames.includes(name)) {
    return exit(
      'The proxy name is not included in the npm-proxy proxies. Please make sure that the name is correct.'
    );
  }

  const newProxy = {};
  const all = (!proxy && !httpsProxy) || (proxy && httpsProxy);
  if (all) {
    const proxyUrl = url || proxy || httpsProxy;
    newProxy[PROXY] = newProxy[HTTPSPROXY] = /\/$/.test(proxyUrl)
      ? proxyUrl
      : proxyUrl + '/';
  } else {
    if (proxy) {
      newProxy[PROXY] = /\/$/.test(proxy) ? proxy : proxy + '/';
    }
    if (httpsProxy) {
      newProxy[HTTPSPROXY] = /\/$/.test(httpsProxy)
        ? httpsProxy
        : httpsProxy + '/';
    }
  }

  const newProxyMerged = Object.assign(proxies[name], newProxy);
  await writeFile(
    NPRC,
    Object.assign(proxies, {
      [name]: newProxyMerged,
    })
  );

  printSuccess(
    `Set proxy ${name} success, run ${chalk.green(
      'npm-proxy use ' + name
    )} command to use ${name} proxy.`
  );
}

module.exports = setProxy;

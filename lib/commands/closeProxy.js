const {
  readFile,
  writeFile,
  printSuccess,
  getProxies,
} = require('../util/helpers');

const {
  NPMRC,
  PROXY,
  HTTPSPROXY,
  DISABLEPREFIX,
} = require('../util/constants');

async function closeProxy() {
  const npmrc = await readFile(NPMRC);
  const currentProxy = npmrc[PROXY] || npmrc[`${DISABLEPREFIX}${PROXY}`];

  delete npmrc[PROXY];
  delete npmrc[HTTPSPROXY];

  const proxy = {
    [`${DISABLEPREFIX}${PROXY}`]: currentProxy,
    [`${DISABLEPREFIX}${HTTPSPROXY}`]: currentProxy,
  };

  await writeFile(NPMRC, Object.assign(npmrc, proxy));

  let name = '';
  const proxies = await getProxies();
  Object.keys(proxies).forEach((key) => {
    const proxy = proxies[key];
    if (proxy[PROXY] === currentProxy) {
      name = key;
    }
  });

  printSuccess(`The proxy '${name}' has been disabled.`);
}

module.exports = (...args) => {
  closeProxy(...args);
};

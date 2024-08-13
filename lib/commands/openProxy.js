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
  const currentProxy = npmrc[`${DISABLEPREFIX}${PROXY}`];

  delete npmrc[`${DISABLEPREFIX}${PROXY}`];
  delete npmrc[`${DISABLEPREFIX}${HTTPSPROXY}`];

  const proxy = {
    [`${PROXY}`]: currentProxy,
    [`${HTTPSPROXY}`]: currentProxy,
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

  printSuccess(`The proxy '${name}' has been enabled.`);
}

module.exports = (...args) => {
  closeProxy(...args);
};

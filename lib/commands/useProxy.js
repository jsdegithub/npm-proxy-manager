const {
  readFile,
  writeFile,
  printSuccess,
  getProxies,
  isProxyNotFound,
} = require('../util/helpers');

const { NPMRC } = require('../util/constants');

async function useProxy(name) {
  if (await isProxyNotFound(name)) {
    return;
  }

  const proxies = await getProxies();
  const proxy = proxies[name];
  const npmrc = await readFile(NPMRC);
  await writeFile(NPMRC, Object.assign(npmrc, proxy));

  printSuccess(`The proxy has been changed to '${name}'.`);
}

module.exports = (...args) => {
  useProxy(...args);
};

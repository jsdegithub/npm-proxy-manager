const {
  readFile,
  writeFile,
  printSuccess,
  getCurrentProxy,
  isProxyNotFound,
} = require('../util/helpers');
const { NPMRC, NPRC, PROXY, HTTPSPROXY } = require('../util/constants');
const inquirer = require('inquirer');

async function delProxy(name) {
  if (await isProxyNotFound(name)) {
    return;
  }

  const customProxies = await readFile(NPRC);
  const proxy = customProxies[name];
  const currentProxy = await getCurrentProxy();
  if (proxy[PROXY] === currentProxy) {
    const { ok } = await inquirer.prompt([
      {
        name: 'ok',
        type: 'confirm',
        message: `The proxy you are deleting is currently in use. Are you sure you want to delete it?`,
      },
    ]);

    if (!ok) {
      return;
    }
  }

  delete customProxies[name];
  await writeFile(NPRC, customProxies);
  printSuccess(`The proxy '${name}' has been deleted successfully.`);

  if (proxy[PROXY] === currentProxy) {
    const npmrc = await readFile(NPMRC);
    delete npmrc[PROXY];
    delete npmrc[HTTPSPROXY];
    writeFile(NPMRC, npmrc);
  }
}

module.exports = (...args) => {
  delProxy(...args);
};

const {
  readFile,
  writeFile,
  printSuccess,
  exit,
  isProxyNotFound,
} = require('../util/helpers');
const { NPRC } = require('../util/constants');

async function renameProxy(name, newName) {
  if (await isProxyNotFound(name)) {
    return exit(`The proxy ${name} is not exist.`);
  }
  if (name === newName) {
    return exit('The names cannot be the same.');
  }

  if (!(await isProxyNotFound(newName, false))) {
    return exit(`The new proxy name '${newName}' is already exist.`);
  }
  const customProxies = await readFile(NPRC);
  customProxies[newName] = JSON.parse(JSON.stringify(customProxies[name]));
  delete customProxies[name];
  await writeFile(NPRC, customProxies);
  printSuccess(`The proxy '${name}' has been renamed to '${newName}'.`);
}

module.exports = renameProxy;

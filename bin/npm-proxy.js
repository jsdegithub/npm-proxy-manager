#! /usr/bin/env node

const { program } = require('commander');
const package = require('../package.json');

const listCurrentProxy = require('../lib/commands/listCurrentProxy');
const listProxy = require('../lib/commands/listProxy');
const useProxy = require('../lib/commands/useProxy');
const addProxy = require('../lib/commands/addProxy');
const delProxy = require('../lib/commands/delProxy');
const openProxy = require('../lib/commands/openProxy');
const closeProxy = require('../lib/commands/closeProxy');
const setProxy = require('../lib/commands/setProxy');
const renameProxy = require('../lib/commands/renameProxy');
const testProxy = require('../lib/commands/testProxy');

program.version(package.version, '-v, --version', 'show version number');

program.command('open').description('enable npm proxy').action(openProxy);

program.command('close').description('disable npm proxy').action(closeProxy);

program
  .command('current')
  .alias('cur')
  .option('-u, --show-url', 'show the proxy URL instead of the name')
  .description('show current proxy name or URL')
  .action(listCurrentProxy);

program
  .command('list')
  .alias('ls')
  .description('list all the proxies')
  .action(listProxy);

program
  .command('use <name>')
  .description('change current proxy')
  .action(useProxy);

program
  .command('add <name> <url>')
  .description('add custom proxy')
  .action(addProxy);

program
  .command('delete <name>')
  .alias('del')
  .alias('remove')
  .alias('rm')
  .description('delete custom proxy')
  .action(delProxy);

program
  .command('set <name> <url>')
  .description('set an existing proxy url')
  .action(setProxy);

program
  .command('rename <name> <newName>')
  .description('change custom proxy name')
  .action(renameProxy);

program
  .command('ping')
  .description('show response time for current proxy')
  .action(testProxy);

program.parse(process.argv);

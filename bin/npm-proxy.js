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

program.version(package.version);

program.command('open').description('Enable npm proxy').action(openProxy);

program.command('close').description('Disable npm proxy').action(closeProxy);

program
  .command('current')
  .alias('cur')
  .option('-u, --show-url', 'Show the proxy URL instead of the name')
  .description('Show current proxy name or URL')
  .action(listCurrentProxy);

program
  .command('list')
  .alias('ls')
  .description('List all the proxies')
  .action(listProxy);

program
  .command('use <name>')
  .description('Change current proxy')
  .action(useProxy);

program
  .command('add <name> <url> [home]')
  .description('Add custom proxy')
  .action(addProxy);

program
  .command('delete <name>')
  .alias('del')
  .alias('remove')
  .alias('rm')
  .description('Delete custom proxy')
  .action(delProxy);

program
  .command('set <name> <url> [home]')
  .description('Set an existing proxy url')
  .action(setProxy);

program
  .command('rename <name> <newName>')
  .description('Change custom proxy name')
  .action(renameProxy);

program.parse(process.argv);

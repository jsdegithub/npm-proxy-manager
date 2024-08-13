#! /usr/bin/env node

const { program } = require('commander');

const package = require('../package.json');

const listProxy = require('../lib/commands/listProxy');
const useProxy = require('../lib/commands/useProxy');
const addProxy = require('../lib/commands/addProxy');
const delProxy = require('../lib/commands/delProxy');
const openProxy = require('../lib/commands/openProxy');
const closeProxy = require('../lib/commands/closeProxy');

program.version(package.version);

program.command('open').description('Enable npm proxy').action(openProxy);

program.command('close').description('Disable npm proxy').action(closeProxy);

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

program.parse();

#! /usr/bin/env node

const { program } = require('commander');

const package = require('../package.json');

const toggleProxy = require('../lib/commands/toggleProxy');
const listProxy = require('../lib/commands/listProxy');
const useProxy = require('../lib/commands/useProxy');

program.version(package.version);

program
  .command('open')
  .description('Enable npm proxy')
  .action(() => {
    toggleProxy(true);
  });

program
  .command('close')
  .description('Disable npm proxy')
  .action(() => {
    toggleProxy(false);
  });

program
  .command('list')
  .alias('ls')
  .description('List all the proxies')
  .action(listProxy);

program
  .command('use <name>')
  .description('Change current proxy')
  .action(useProxy);

program.parse();

#! /usr/bin/env node

const {program} = require('commander');

const package = require('../package.json');
const toggleProxy = require('../lib/commands/toggleProxy');
const listProxy = require('../lib/commands/listProxy');

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

program.command('list').alias('ls').description('List all the registries').action(listProxy);

program.parse();

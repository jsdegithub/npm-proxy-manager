#! /usr/bin/env node

const {program} = require('commander');

program
  .command('open')
  .description('Enable npm proxy')
  .action(() => {
    require('../lib/toggleProxy')(true);
  });

program
  .command('close')
  .description('Disable npm proxy')
  .action(() => {
    require('../lib/toggleProxy')(false);
  });

program.parse();

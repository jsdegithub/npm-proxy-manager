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

program
  .command('open')
  .option('-p, --proxy', 'open http proxy')
  .option('-hp, --https-proxy', 'open https proxy')
  .description('enable npm proxy')
  .action(openProxy);

program
  .command('close')
  .option('-p, --proxy', 'close http proxy')
  .option('-hp, --https-proxy', 'close https proxy')
  .description('disable npm proxy')
  .action(closeProxy);

program
  .command('current')
  .alias('cur')
  .option('-p, --proxy', 'list current http proxy')
  .option('-hp, --https-proxy', 'list current https proxy')
  .description('show current proxy name or URL')
  .action(listCurrentProxy);

program
  .command('list')
  .alias('ls')
  .option('-p, --proxy', 'list http proxy')
  .option('-hp, --https-proxy', 'list https proxy')
  .description('list all the proxies')
  .action(listProxy);

program
  .command('use <name>')
  .option('-p, --proxy', 'use http proxy')
  .option('-hp, --https-proxy', 'use https proxy')
  .description('change current proxy')
  .action(useProxy);

program
  .command('add <name> [url]')
  .option('-p, --proxy <proxy>', 'add http proxy')
  .option('-hp, --https-proxy <httpsProxy>', 'add https proxy')
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
  .command('set <name> [url]')
  .option('-p, --proxy <proxy>', 'set http proxy')
  .option('-hp, --https-proxy <httpsProxy>', 'set https proxy')
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

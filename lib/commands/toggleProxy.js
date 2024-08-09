const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const {NPMRC} = require('../util/constants');

function toggleProxy(enable) {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  if (!fs.existsSync(NPMRC)) {
    console.error('No .npmrc file found at the user config location.');
    return;
  }

  let content = fs.readFileSync(NPMRC, 'utf8');
  let lines = content.split('\n');
  let proxyLine = lines.findIndex((line) => line.includes('proxy='));
  let httpsProxyLine = lines.findIndex((line) => line.includes('https-proxy='));

  if (enable) {
    if (proxyLine !== -1 && lines[proxyLine].startsWith('#')) {
      lines[proxyLine] = lines[proxyLine].slice(1);
    }
    if (httpsProxyLine !== -1 && lines[httpsProxyLine].startsWith('#')) {
      lines[httpsProxyLine] = lines[httpsProxyLine].slice(1);
    }
  } else {
    if (proxyLine !== -1 && !lines[proxyLine].startsWith('#')) {
      lines[proxyLine] = `#${lines[proxyLine]}`;
    }
    if (httpsProxyLine !== -1 && !lines[httpsProxyLine].startsWith('#')) {
      lines[httpsProxyLine] = `#${lines[httpsProxyLine]}`;
    }
  }

  fs.writeFileSync(NPMRC, lines.join('\n'));
  console.log(`Proxy ${enable ? 'enabled' : 'disabled'} in user-level .npmrc`);
}

module.exports = (...args) => {
  toggleProxy(...args);
};

const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const chalk = require('chalk');

function toggleProxy(enable) {
  exec('npm config get userconfig', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    const npmrcPath = stdout.trim();

    if (!fs.existsSync(npmrcPath)) {
      console.error('No .npmrc file found at the user config location.');
      return;
    }

    let content = fs.readFileSync(npmrcPath, 'utf8');
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

    fs.writeFileSync(npmrcPath, lines.join('\n'));
    console.log(`Proxy ${enable ? 'enabled' : 'disabled'} in user-level .npmrc`);
  });
}

module.exports = (...args) => {
  toggleProxy(...args);
};

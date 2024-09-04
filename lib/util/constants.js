const path = require('path');

const AUTH = '_auth';
const EMAIL = 'email';
const PROXY = 'proxy';
const HTTPSPROXY = 'https-proxy';
const REPOSITORY = 'repository';
const ALWAYS_AUTH = 'always-auth';
const NPRC = path.join(
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'],
  '.nprc'
);
const NPMRC = path.join(
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'],
  '.npmrc'
);
const DISABLEPREFIX = 'np-dis-';

module.exports = {
  NPRC,
  NPMRC,
  AUTH,
  ALWAYS_AUTH,
  REPOSITORY,
  PROXY,
  HTTPSPROXY,
  EMAIL,
  DISABLEPREFIX,
};

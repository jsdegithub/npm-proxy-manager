const path = require('path');

const HOME = 'home';
const AUTH = '_auth';
const EMAIL = 'email';
const REGISTRY = 'proxy';
const PROXY = 'proxy';
const HTTPSPROXY = 'https-proxy';
const REPOSITORY = 'repository';
const ALWAYS_AUTH = 'always-auth';
const REGISTRY_ATTRS = [REGISTRY, HOME, AUTH, ALWAYS_AUTH];
const NPRC = path.join(
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'],
  '.nprc'
);
const NPMRC = path.join(
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'],
  '.npmrc'
);

module.exports = {
  NPRC,
  NPMRC,
  AUTH,
  ALWAYS_AUTH,
  REPOSITORY,
  REGISTRY,
  PROXY,
  HTTPSPROXY,
  HOME,
  EMAIL,
  REGISTRY_ATTRS,
};

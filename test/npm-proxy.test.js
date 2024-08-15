const { exec } = require('child_process');

describe('npm-proxy CLI', () => {
  test('should show version number', (done) => {
    exec('node ./bin/npm-proxy.js -v', (error, stdout, stderr) => {
      if (error) {
        done(error);
      }
      expect(stdout).toContain(require('../package.json').version);
      done();
    });
  });

  test('should enable npm proxy', (done) => {
    exec('node ./bin/npm-proxy.js open', (error, stdout, stderr) => {
      if (error) {
        done(error);
      }
      expect(stdout).toContain('Proxy enabled');
      done();
    });
  });

  test('should disable npm proxy', (done) => {
    exec('node ./bin/npm-proxy.js close', (error, stdout, stderr) => {
      if (error) {
        done(error);
      }
      expect(stdout).toContain('Proxy disabled');
      done();
    });
  });

  test('should show current proxy', (done) => {
    exec('node ./bin/npm-proxy.js current', (error, stdout, stderr) => {
      if (error) {
        done(error);
      }
      expect(stdout).toContain('Current proxy:');
      done();
    });
  });

  test('should show current proxy URL', (done) => {
    exec('node ./bin/npm-proxy.js current -u', (error, stdout, stderr) => {
      if (error) {
        done(error);
      }
      expect(stdout).toContain('Current proxy URL:');
      done();
    });
  });
});

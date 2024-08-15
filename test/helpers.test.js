const {
  printMessages,
  printMessage,
  geneDashLine,
  isLowerCaseEqual,
} = require('../lib/util/helpers');

describe('helpers.js functions', () => {
  test('printMessages should log all messages', () => {
    console.log = jest.fn();
    const messages = ['message1', 'message2', 'message3'];
    printMessages(messages);
    expect(console.log).toHaveBeenCalledTimes(messages.length);
    messages.forEach((message, index) => {
      expect(console.log).toHaveBeenNthCalledWith(index + 1, message);
    });
  });

  test('printMessage should log a single message', () => {
    console.log = jest.fn();
    const message = 'test message';
    printMessage(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });

  test('geneDashLine should generate a dashed line', () => {
    const message = 'test';
    const length = 10;
    const result = geneDashLine(message, length);
    expect(result).toContain('------');
  });

  test('isLowerCaseEqual should return true for equal strings', () => {
    const str1 = 'Test';
    const str2 = 'test';
    expect(isLowerCaseEqual(str1, str2)).toBe(true);
  });

  test('isLowerCaseEqual should return false for different strings', () => {
    const str1 = 'Test';
    const str2 = 'different';
    expect(isLowerCaseEqual(str1, str2)).toBe(false);
  });

  test('isLowerCaseEqual should return true for both null strings', () => {
    expect(isLowerCaseEqual(null, null)).toBe(true);
  });

  test('isLowerCaseEqual should return false for one null string', () => {
    expect(isLowerCaseEqual('test', null)).toBe(false);
    expect(isLowerCaseEqual(null, 'test')).toBe(false);
  });
});

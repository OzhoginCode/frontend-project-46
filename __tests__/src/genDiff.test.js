import genDiff from '../../src/genDiff.js';

const config = {
  globals: {
    NODE_OPTIONS: '--experimental-vm-modules',
  },
};

export default config;

const absPath1 = '/Users/magicbass/Desktop/frontend-project-46/fixtures/file1.json';
const absPath2 = '/Users/magicbass/Desktop/frontend-project-46/fixtures/file2.json';

const relPath1 = './fixtures/file1.json';
const relPath2 = './fixtures/file2.json';

const expected = `{
  - follow: false
  host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;


test('gendiff main flow, absolute paths', () => {
  expect(genDiff(absPath1, absPath2)).toBe(expected);
});

test('gendiff main flow, relative paths', () => {
  expect(genDiff(relPath1, relPath2)).toBe(expected);
});

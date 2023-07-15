import genDiff from '../../src/genDiff.js';
import path from 'path';
import expected from '../../fixtures/expected.js';

const config = {
  globals: {
    NODE_OPTIONS: '--experimental-vm-modules',
  },
};

export default config;

const relPath1 = './fixtures/file1.json';
const relPath2 = './fixtures/file2.json';

const absPath1 = path.resolve(relPath1);
const absPath2 = path.resolve(relPath2);


test('gendiff main flow, absolute paths', () => {
  expect(genDiff(absPath1, absPath2)).toBe(expected);
});

test('gendiff main flow, relative paths', () => {
  expect(genDiff(relPath1, relPath2)).toBe(expected);
});

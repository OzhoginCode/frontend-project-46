import path from 'path';
import genDiff from '../../src/genDiff.js';
import expected from '../../__fixtures__/expected.js';

const relPath1 = './__fixtures__/file1.json';
const relPath2 = './__fixtures__/file2.json';

const absPath1 = path.resolve(relPath1);
const absPath2 = path.resolve(relPath2);

test('gendiff main flow, absolute paths', () => {
  expect(genDiff(absPath1, absPath2)).toBe(expected);
});

test('gendiff main flow, relative paths', () => {
  expect(genDiff(relPath1, relPath2)).toBe(expected);
});

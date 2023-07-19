import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../../src/genDiff.js';
import expected from '../../__fixtures__/expected.js';
import expected2 from '../../__fixtures__/expected2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '..', '__fixtures__', filename);

const jsonPath1 = getFixturePath('file1.json');
const jsonPath2 = getFixturePath('file2.json');

test('gendiff main flow, plain objects, json', () => {
  expect(genDiff(jsonPath1, jsonPath2)).toBe(expected);
});

const yamlPath1 = getFixturePath('file1.yml');
const yamlPath2 = getFixturePath('file2.yml');

test('gendiff main flow, plain objects, yaml', () => {
  expect(genDiff(yamlPath1, yamlPath2)).toBe(expected);
});

const jsonPath3 = getFixturePath('file3.json');
const jsonPath4 = getFixturePath('file4.json');

test('gendiff main flow, nested objects, json', () => {
  expect(genDiff(jsonPath3, jsonPath4)).toBe(expected2);
});

// tst('gendiff main flow, nested objects, yaml', () => {
//   expect(genDiff(yamlPath3, yamlPath4)).toBe(expected2);
// });

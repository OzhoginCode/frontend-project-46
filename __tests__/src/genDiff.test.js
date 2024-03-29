import fs from 'fs';
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

test('gendiff main flow, stylish format, json', () => {
  expect(genDiff(jsonPath1, jsonPath2)).toBe(expected);
});

const yamlPath1 = getFixturePath('file1.yml');
const yamlPath2 = getFixturePath('file2.yml');

test('gendiff main flow, stylish format, yaml', () => {
  expect(genDiff(yamlPath1, yamlPath2)).toBe(expected);
});

test('gendiff main flow, plain format, json', () => {
  expect(genDiff(jsonPath1, jsonPath2, 'plain')).toBe(expected2);
});

test('gendiff main flow, plain format, yaml', () => {
  expect(genDiff(yamlPath1, yamlPath2, 'plain')).toBe(expected2);
});

const expected3Path = getFixturePath('expected3.json');
const expected3 = fs.readFileSync(expected3Path, 'utf8');

test('gendiff main flow, json format, json', () => {
  expect(genDiff(jsonPath1, jsonPath2, 'json')).toBe(expected3);
});

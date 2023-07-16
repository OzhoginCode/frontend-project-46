import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../../src/genDiff.js';
import expected from '../../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '..', '__fixtures__', filename);

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

test('gendiff main flow, absolute paths', () => {
  expect(genDiff(path1, path2)).toBe(expected);
});

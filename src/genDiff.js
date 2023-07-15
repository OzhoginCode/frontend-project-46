import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getObj1 = (file) => JSON.parse(file);
const getKeys = (obj) => Object.keys(obj);

export default function genDiff(path1, path2) {
  const makePair = (key, value) => `${key}: ${value}`;

  const makeComparingString = (key, value, sign = null) => {
    const pair = makePair(key, value);
    return !sign ? ` ${pair}` : ` ${sign} ${pair}`;
  };

  const compareByKey = (obj1, obj2, key) => {
    if (!Object.hasOwn(obj1, key)) return makeComparingString(key, obj2[key], '+');
    if (!Object.hasOwn(obj2, key)) return makeComparingString(key, obj1[key], '-');
    if (obj1[key] === obj2[key]) return makeComparingString(key, obj1[key]);
    return `${makeComparingString(key, obj1[key], '-')}\n ${makeComparingString(key, obj2[key], '+')}`;
  };

  const fixedPath1 = path.resolve(path1);
  const fixedPath2 = path.resolve(path2);

  const file1 = fs.readFileSync(fixedPath1, 'utf8');
  const file2 = fs.readFileSync(fixedPath2, 'utf8');

  const json1 = getObj1(file1);
  const json2 = getObj1(file2);

  const file1Keys = getKeys(json1);
  const file2Keys = getKeys(json2);

  const commonKeys = _.union(file1Keys, file2Keys);
  const sortedKeys = _.sortBy(commonKeys);

  const result = sortedKeys
    .map((key) => compareByKey(json1, json2, key))
    .join('\n ');

  const formatResult = `{\n ${result}\n}`;

  return formatResult;
}

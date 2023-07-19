import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getKeys = (obj) => Object.keys(obj);

const makePair = (key, value) => `${key}: ${value}`;

const makeComparingString = (key, value, depth, sign = null) => {
  const pair = makePair(key, value);
  const indent = ' '.repeat(4 * depth);
  const signIndent = ' '.repeat(4 * depth - 2);
  return !sign ? `${indent}${pair}` : `${signIndent}${sign} ${pair}`;
};

// const compareByKey = (obj1, obj2, key) => {
//   if (!Object.hasOwn(obj1, key)) return makeComparingString(key, obj2[key], '+');
//   if (!Object.hasOwn(obj2, key)) return makeComparingString(key, obj1[key], '-');
//   if (obj1[key] === obj2[key]) return makeComparingString(key, obj1[key]);
// return `${makeComparingString(key, obj1[key], '-')}\n ${makeComparingString(key, obj2[key], '+')}
// };

export default function genDiff(path1, path2) {
  const fixedPath1 = path.resolve(path1);
  const fixedPath2 = path.resolve(path2);

  const extname1 = path.extname(fixedPath1);
  const extname2 = path.extname(fixedPath2);

  const file1 = fs.readFileSync(fixedPath1, 'utf8');
  const file2 = fs.readFileSync(fixedPath2, 'utf8');

  const object1 = parse(file1, extname1);
  const object2 = parse(file2, extname2);

  const iter = (obj1, obj2, depth = 1) => {
    if (!_.isObject(obj1) || !_.isObject(obj2)) return obj1;

    const obj1Keys = getKeys(obj1);
    const obj2Keys = getKeys(obj2);

    const allKeys = _.union(obj1Keys, obj2Keys);
    const sortedKeys = _.sortBy(allKeys);

    const result = sortedKeys
      .map((key) => {
        const value1 = iter(obj1[key], obj1[key], depth + 1);
        const value2 = iter(obj2[key], obj2[key], depth + 1);

        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          const value = iter(obj1[key], obj2[key], depth + 1);
          return makeComparingString(key, value, depth);
        }
        if (!Object.hasOwn(obj1, key)) {
          return makeComparingString(key, value2, depth, '+');
        }
        if (!Object.hasOwn(obj2, key)) {
          return makeComparingString(key, value1, depth, '-');
        }
        if (value1 === value2) {
          return makeComparingString(key, value1, depth);
        }
        return `${makeComparingString(key, value1, depth, '-')}\n${makeComparingString(key, value2, depth, '+')}`;
      })
      .join('\n');
    const signIndent = ' '.repeat(4 * (depth - 1));
    const formatResult = `{\n${result}\n${signIndent}}`;

    return formatResult;
  };
  return iter(object1, object2);
}

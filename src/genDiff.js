import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const getKeys = (obj) => Object.keys(obj);

const getAllSortedKeys = (obj1, obj2) => {
  const elem1Keys = getKeys(obj1);
  const elem2Keys = getKeys(obj2);

  const allKeys = _.union(elem1Keys, elem2Keys);
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys;
};

const formatResult = (tree, formatter) => {
  if (formatter === 'stylish') return stylish(tree);
  if (formatter === 'plain') return plain(tree);
  if (formatter === 'json') return json(tree);
  return null;
};

const getCorrectPath = (filePath) => path.resolve(filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const iter = (elem1, elem2, status, newValue) => {
  if (!_.isPlainObject(elem1) && !_.isPlainObject(elem2)) {
    const node = {
      key: elem1,
      value: elem2,
      status,
      newValue,
    };
    if (!_.isUndefined(newValue)) return { ...node, newValue };
    return node;
  }

  const allSortedKeys = getAllSortedKeys(elem1, elem2);

  const children = allSortedKeys
    .flatMap((key) => {
      const value1 = elem1[key];
      const value2 = elem2[key];

      if (_.isPlainObject(value1) || _.isPlainObject(value2)) {
        if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
          const value = iter(value1, value2);
          return iter(key, value, 'unchanged');
        }
        if (_.isPlainObject(value1)) {
          if (Object.hasOwn(elem2, key)) {
            const value = iter(value1, value1);
            return iter(key, value, 'changed', value2);
          }
          return iter(key, iter(value1, value1), 'removed');
        }
        if (Object.hasOwn(elem1, key)) {
          const value = iter(value2, value2);
          return iter(key, value1, 'changed', value);
        }
        return iter(key, iter(value2, value2), 'added');
      }

      if (Object.hasOwn(elem1, key) && Object.hasOwn(elem2, key)) {
        if (value1 === value2) return iter(key, value1, 'unchanged');
        return iter(key, value1, 'changed', value2);
      }
      if (!Object.hasOwn(elem1, key)) return iter(key, value2, 'added');
      return iter(key, value1, 'removed');
    }, 1);
  return children;
};

export default function genDiff(path1, path2, formatName = 'stylish') {
  const fixedPath1 = getCorrectPath(path1);
  const fixedPath2 = getCorrectPath(path2);

  const extname1 = path.extname(fixedPath1);
  const extname2 = path.extname(fixedPath2);

  const file1 = readFile(fixedPath1);
  const file2 = readFile(fixedPath2);

  const object1 = parse(file1, extname1);
  const object2 = parse(file2, extname2);

  const tree = iter(object1, object2);
  return formatResult(tree, formatName);
}

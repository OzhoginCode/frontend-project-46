import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import stylish from './stylish.js';

const getKeys = (obj) => Object.keys(obj);

const formatResult = (tree, formatter) => formatter(tree);

export default function genDiff(path1, path2, formatter = stylish) {
  const fixedPath1 = path.resolve(path1);
  const fixedPath2 = path.resolve(path2);

  const extname1 = path.extname(fixedPath1);
  const extname2 = path.extname(fixedPath2);

  const file1 = fs.readFileSync(fixedPath1, 'utf8');
  const file2 = fs.readFileSync(fixedPath2, 'utf8');

  const object1 = parse(file1, extname1);
  const object2 = parse(file2, extname2);

  const iter = (obj1, obj2, status = null) => {
    const metaObj = {};

    if (!_.isPlainObject(obj1) && !_.isPlainObject(obj2)) {
      metaObj.key = obj1;
      metaObj.value = obj2;
      metaObj.status = status;
      return metaObj;
    }

    const obj1Keys = getKeys(obj1);
    const obj2Keys = getKeys(obj2);

    const allKeys = _.union(obj1Keys, obj2Keys);
    const sortedKeys = _.sortBy(allKeys);

    const children = sortedKeys
      .flatMap((key) => {
        if (_.isPlainObject(obj1[key]) || _.isPlainObject(obj2[key])) {
          if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
            const value = iter(obj1[key], obj2[key]);
            return iter(key, value, 'unchanged');
          }
          if (_.isPlainObject(obj1[key])) {
            if (Object.hasOwn(obj2, key)) {
              const value = iter(obj1[key], obj1[key]);
              const result = [
                iter(key, value, 'removed'),
                iter(key, obj2[key], 'added')];
              return result;
            }
            return iter(key, iter(obj1[key], obj1[key]), 'removed');
          }
          return iter(key, iter(obj2[key], obj2[key]), 'added');
        }

        if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
          if (obj1[key] === obj2[key]) return iter(key, obj1[key], 'unchanged');
          const result = [
            iter(key, obj1[key], 'removed'),
            iter(key, obj2[key], 'added')];
          return result;
        }
        if (!Object.hasOwn(obj1, key)) return iter(key, obj2[key], 'added');
        return iter(key, obj1[key], 'removed');
      }, 1);
    return children;
  };
  const tree = iter(object1, object2);
  return formatResult(tree, formatter);
}

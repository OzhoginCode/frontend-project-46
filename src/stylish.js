import _ from 'lodash';

const getKeys = (obj) => Object.keys(obj);

const makePair = (key, value) => `${key}: ${value}`;

const makeComparingString = (key, value, depth, sign = null) => {
  const pair = makePair(key, value);
  const indent = ' '.repeat(4 * depth);
  const signIndent = ' '.repeat(4 * depth - 2);
  return !sign ? `${indent}${pair}` : `${signIndent}${sign} ${pair}`;
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const keys = getKeys(node);

    const result = keys.map((elem) => {
      const { key, status } = node[elem];
      const value = _.isObject(node[elem].value)
        ? iter(node[elem].value, depth + 1) : node[elem].value;

      if (status === 'unchanged') {
        return makeComparingString(key, value, depth);
      }
      if (status === 'removed') {
        return makeComparingString(key, value, depth, '-');
      }
      if (status === 'added') {
        return makeComparingString(key, value, depth, '+');
      }
      return makeComparingString(key, value, depth);
    });

    const bracketIndent = ' '.repeat(4 * depth - 4);
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };
  return iter(tree);
};

export default stylish;

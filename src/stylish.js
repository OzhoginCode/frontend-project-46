import _ from 'lodash';

const getKeys = (obj) => Object.keys(obj);

const makePair = (key, value) => `${key}: ${value}`;

const makeComparingString = (key, value, depth, sign = null) => {
  const pair = makePair(key, value);
  const indent = ' '.repeat(4 * depth);
  const signIndent = ' '.repeat(4 * depth - 2);
  return !sign ? `${indent}${pair}` : `${signIndent}${sign} ${pair}`;
};

const addBrackets = (tree, depth) => {
  const bracketIndent = ' '.repeat(4 * depth - 4);
  return `{\n${tree.join('\n')}\n${bracketIndent}}`;
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    if (!_.isObject(node)) return node;
    const keys = getKeys(node);

    const result = keys.map((elem) => {
      const { key, status } = node[elem];
      const value = iter(node[elem].value, depth + 1);

      if (status === 'removed') {
        return makeComparingString(key, value, depth, '-');
      }
      if (status === 'added') {
        return makeComparingString(key, value, depth, '+');
      }
      return makeComparingString(key, value, depth);
    });

    const formattedResult = addBrackets(result, depth);
    return formattedResult;
  };
  return iter(tree);
};

export default stylish;

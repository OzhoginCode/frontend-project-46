import _ from 'lodash';

const getKeys = (obj) => Object.keys(obj);

const makePair = (key, value) => `${key}: ${value}`;

const getIndentSize = (depth) => 4 * depth;
const getIndent = (depth) => ' '.repeat(getIndentSize(depth));
const getSignIndent = (depth) => ' '.repeat(getIndentSize(depth) - 2);
const getBracketIndent = (depth) => ' '.repeat(getIndentSize(depth) - 4);

const formatKeyValuePair = (key, value, depth, sign = null) => {
  const pair = makePair(key, value);
  const indent = getIndent(depth);
  const signIndent = getSignIndent(depth);

  return !sign ? `${indent}${pair}` : `${signIndent}${sign} ${pair}`;
};

const addBrackets = (tree, depth) => {
  const bracketIndent = getBracketIndent(depth);

  return `{\n${tree.join('\n')}\n${bracketIndent}}`;
};

const formatPairWithStatus = (key, value, status, depth) => {
  if (status === 'removed') {
    return formatKeyValuePair(key, value, depth, '-');
  }
  if (status === 'added') {
    return formatKeyValuePair(key, value, depth, '+');
  }
  return formatKeyValuePair(key, value, depth);
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    if (!_.isObject(node)) return node;
    const keys = getKeys(node);

    const result = keys.map((elem) => {
      const { key, status } = node[elem];
      const value = iter(node[elem].value, depth + 1);

      return formatPairWithStatus(key, value, status, depth);
    });

    const formattedResult = addBrackets(result, depth);
    return formattedResult;
  };
  return iter(tree);
};

export default stylish;

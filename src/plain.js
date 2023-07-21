import _ from 'lodash';

const getKeys = (obj) => Object.keys(obj);
const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};
const formatParrentName = (parentName) => (parentName !== '' ? `${parentName}.` : '');

const getComparingString = (key, status, parentName, value, newValue) => {
  const formattedValue = formatValue(value);
  const formattedNewValue = formatValue(newValue);
  if (status === 'removed') {
    return `Property '${parentName}${key}' was removed`;
  }
  if (status === 'added') {
    return `Property '${parentName}${key}' was added with value: ${formattedValue}`;
  }
  if (status === 'changed') {
    return `Property '${parentName}${key}' was updated. From ${formattedValue} to ${formattedNewValue}`;
  }
  return null;
};

const stylish = (tree) => {
  const iter = (node, parentName = '') => {
    const keys = getKeys(node);
    const result = keys.map((elem) => {
      const {
        key, status, value, newValue,
      } = node[elem];

      const dottedParentName = formatParrentName(parentName);

      if (status !== 'unchanged') {
        return getComparingString(key, status, dottedParentName, value, newValue);
      }

      if (_.isArray(value)) {
        return iter(value, `${dottedParentName}${key}`);
      }
      return null;
    });

    const formattedResult = result
      .filter((e) => e !== null)
      .join('\n');
    return formattedResult;
  };
  return iter(tree);
};

export default stylish;

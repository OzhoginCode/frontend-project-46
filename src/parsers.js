import yaml from 'js-yaml';

const parseJson = (file) => JSON.parse(file);
const parseYaml = (file) => yaml.load(file);

export default (file, extname) => {
  if (extname === '.json') return parseJson(file);
  if (extname === '.yml' || extname === '.yaml') return parseYaml(file);
  return null;
};

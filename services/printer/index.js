const formats = {
  console: 'console',
  json: 'json'
};

const objectToString = (obj, prefix = '') =>
  Object.keys(obj)
    .map((key) => {
      if (Array.isArray(obj[key])) {
        return `${prefix}${key}: [${
          obj[key].reduce((prev, cur) =>
            prev.length
              ? `${prev}, ${cur}`
              : `${cur}`
          , '')
        }]`;
      } else if (obj[key] instanceof RegExp) {
        return `${prefix}${key}: ${obj[key].toString()}`;
      } else if (typeof obj[key] === 'object') {
        return `${prefix}${key}:\n${objectToString(obj[key], '  ')}`;
      } else {
        return `${prefix}${key}: ${obj[key]}`;
      }
    }).join('\n');

const print = (obj, format = formats.console) => {
  if (typeof obj !== 'object') {
    throw new Error('Invalid parameter! Object required.');
  }

  switch (format) {
    case formats.json:
      return JSON.stringify(obj, null, 2);
    case formats.console:
      return objectToString(obj);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

module.exports = {
  formats,
  print
};

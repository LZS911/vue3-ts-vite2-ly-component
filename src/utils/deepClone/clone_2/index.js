const deepClone = (source, map = new WeakMap()) => {
  if (source === null) {
    return null;
  }
  if (source === undefined) {
    return undefined;
  }
  if (typeof source !== 'object') {
    return source;
  }

  if (Array.isArray(source)) {
    const clone = [];
    source.forEach((v) => {
      clone.push(deepClone(v));
    });
    return clone;
  }
  const clone = {};
  Object.keys(source).forEach((key) => {
    clone[key] = deepClone(source[key]);
  });
  return clone;
};

export default deepClone;

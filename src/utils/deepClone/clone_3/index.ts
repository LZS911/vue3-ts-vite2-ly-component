const isArray = <T>(source: unknown): source is Array<T> => Array.isArray(source);
const isMap = <K, V>(source: unknown): source is Map<K, V> => Object.prototype.toString.call(source) === '[object Map]';
const isSet = <T>(source: unknown): source is Set<T> => Object.prototype.toString.call(source) === '[object Set]';

const isObject = (target: unknown) => {
  const type = typeof target;
  return target !== null && type === 'object';
};

const initData = (source: any) => {
  const { constructor } = source;
  if (!!constructor) {
    return new constructor();
  }
  return;
};

const deepClone = (source: unknown, map = new WeakMap()) => {
  if (!isObject(source)) {
    return source;
  }
  const clone = initData(source);
  if (!clone) {
    return source;
  }
  if (!!map.has(source as Object)) {
    return map.get(source as Object);
  }
  map.set(source as Object, clone);

  if (isArray<any>(source)) {
    source.forEach((v) => {
      (clone as Array<any>).push(deepClone(v, map));
    });
    return clone;
  }

  if (isMap<any, any>(source)) {
    source.forEach((v, key) => {
      (clone as Map<any, any>).set(key, deepClone(v, map));
    });
    return clone;
  }

  if (isSet<any>(source)) {
    source.forEach((v) => {
      (clone as Set<any>).add(deepClone(v, map));
    });
    return clone;
  }

  Object.keys(source as any).forEach((v) => {
    clone[v] = deepClone((source as any)[v], map);
  });
  return clone;
};

export default deepClone;

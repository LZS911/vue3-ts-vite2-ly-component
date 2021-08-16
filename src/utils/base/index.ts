export const baseType = () => {
  const nullTypeStr = typeof null;
  const undefinedTypeStr = typeof undefined;
  const booleanTypeStr = typeof true;
  const stringTypeStr = typeof 'hello javascript';
  const numberTypeStr = typeof 911;
  const symbolTypeStr = typeof Symbol(123);
  const bigIntTypeStr = typeof BigInt(123);
  const objTypeStr = typeof {};
  const arrTypeStr = typeof [];
  const funTypeStr = typeof (() => { });
  return {
    nullTypeStr,
    undefinedTypeStr,
    booleanTypeStr,
    stringTypeStr,
    numberTypeStr,
    symbolTypeStr,
    bigIntTypeStr,
    objTypeStr,
    arrTypeStr,
    funTypeStr
  };
};

export const testInstanceof = () => {
  const a: any[] = [];
  a instanceof Array; // true
  a instanceof Object; // true
  const o = {};
  o instanceof Object; // true
  o instanceof Array; // false

  function Fn(): any { }
  // const f = new Fn();
  const f = {};
  Object.setPrototypeOf(f, Fn.prototype);
  f instanceof Fn; // true
  f instanceof Object; // true
  const c = Object.create(f);
  c instanceof Fn; //true
  const notO = Object.create(null);
  notO instanceof Object; //false
};

export const myInstanceof = (target: unknown, constructor: any): boolean => {
  const tmp = Object.getPrototypeOf(target);
  if (!tmp) return false;
  if (tmp === constructor.prototype) return true;
  return myInstanceof(tmp, constructor);
};

type MyTypeOfReturnT =
  'object' | 'function' | 'number' | 'string'
  | 'symbol' | 'bigint' | 'array' | 'undefined' | 'null' | 'unknown'
export const myTypeof = (target: unknown): MyTypeOfReturnT => {
  const tmpStr = Object.prototype.toString.call(target);
  const tmpArr = tmpStr.split(' ');
  if (tmpArr.length !== 2) return 'unknown' as MyTypeOfReturnT;
  return tmpArr[1].substring(0, tmpArr[1].length - 1).toLocaleLowerCase() as MyTypeOfReturnT;
};

export const valuePassed = (name: string) => {
  name = 'gll';
};

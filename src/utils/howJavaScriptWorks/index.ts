import { isFunction, isString, isNumber, isBool } from '..';

/**
 * @param number
 * @returns
 */
export const deconstruct = (number: number) => {
  let sign = 1;
  let coefficient = number;
  let exponent = 0;

  if (coefficient < 0) {
    coefficient = -coefficient;
    sign -= 1;
  }

  if (Number.isFinite(number) && number !== 0) {
    exponent = -1128;
    let reduction = coefficient;
    while (reduction !== 0) {
      exponent += 1;
      reduction /= 2;
    }

    reduction = exponent;
    while (reduction > 0) {
      coefficient *= 2;
      reduction -= 1;
    }
    while (reduction < 0) {
      coefficient *= 2;
      reduction += 1;
    }
  }
  return {
    sign,
    coefficient,
    exponent,
    number
  };
};

/**
 *
 * @param string : string
 * @param container : object | function
 * @param encoder :object | function
 * @return : string
 *
 * describe: format string by container or encoder
 * example:  fulfill('str is {name}', {name:'gl'}) => 'str is gl'
 *
 * For more examples, see Unit Test
 */
export const fulfill = Object.freeze((string: string, container: { [key in string]: any } | Function, encoder: { [key in string]: any } | Function = defaultEncoder) => {
  const rxSyntacticVariable = /\{([^{}:\s]+)(?::([^{}:\s]+))?\}/g;

  return string.replace(rxSyntacticVariable, (original: string, path: string, encoding: string = '') => {
    try {
      let replacement = isFunction(container) ? container(path, encoding) : getDeepObj(path, container);
      replacement = (isFunction(encoder) ? encoder : encoder[encoding])(replacement, path, encoding);
      if (isNumber(replacement) || isBool(replacement)) replacement = String(replacement);
      return isString(replacement) ? replacement : original;
    } catch (error) {
      console.error(error);
      return original;
    }
  });
});
export const defaultEncoder = (replacement: string) => {
  const rxDeleteDefault = /[<>$%"\\]/g;
  return replacement.replace(rxDeleteDefault, '');
};
export const getDeepObj = (path: string, obj: { [key in string]: any }) => path.split('.').reduce((refinement, element) => refinement[element], obj);

export const entityify = (text: any) => String(text).replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt:')
  .replace(/\\/g, '&bslo;')
  .replace(/"|'/g, '&quot;');

//  ========================================== typescript ==========================================
interface Eg1 {
  name: string;
  age: string;
}

type T1 = keyof Eg1; // 'age' | 'name'

class Eg2 {
  private name: string = '';

  public age: string = '';

  protected sex: string = '';
}

type T2 = keyof Eg2; // 'age' only get public property

interface Eg3 {
  name: string;
  age: number;
}
type T3 = Eg3['name']; // string
type T4 = Eg3['name' | 'age']; // string | number
type T5 = Eg3[keyof Eg3] // string | number

type T6 = Eg1 & Eg3;

/**
 * @example
 * type A1 = '1'
 */
type A1 = 'x' extends 'x' ? '1' : '2'

/**
 * @example
 * type A1 = '2'
 */
type A2 = 'x' | 'y' extends 'x' ? '1' : '2'

type P<T> = T extends 'x' ? '1' : '2'

/**
 * @example
 * type A1 = '1' | '2'
 */
type A3 = P<'x' | 'y'>;

/**
 * @example
 * type A1 = '2'
 */
type A4 = P<['x' | 'y']>

interface Par {
  name: string;
}

interface Chi extends Par {
  sex: string;
}

let a: Par = {
  name: 'ly'
};
const b: Chi = {
  name: 'lzs',
  sex: '1'
};

a = b;
// b = a; not

// type A = 1 | 2 | 3;
// type B = 2 | 3;
// let a: A;
// let b: B;

// // 不可赋值
// b = a;
// // 可以赋值
// a = b;

//interface 情况下, 类型多的为子类, 子类可以赋值给父类
//type 情况下, 类型多的为父类, 子类可以赋值给父类

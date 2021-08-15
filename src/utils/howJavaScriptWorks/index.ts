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
export const integer = (from: number = 0, to: number = Infinity, step: number = 1) => () => {
  if (from < to) {
    const result = from;
    from += step;
    return result;
  }
};
export const element = <T>(arr: T[], gen = integer(0, arr.length)) => () => {
  const element_nr = gen();
  if (element_nr !== undefined) {
    return arr[element_nr];
  }
};
export const property = (o: { [key in string]: any }, gen = element(Object.keys(o))) => () => {
  const key = gen();
  if (key && o[key] !== undefined) {
    return [key, o[key]];
  }
};

export const collect = <T>(generator: () => T | undefined, array: T[]) => () => {
  const value = generator();
  if (value !== undefined) {
    array.push(value);
  }
  return value;
};

export const repeat = <T>(generator: () => T | undefined): void => {
  if (generator() !== undefined) {
    return repeat(generator);
  }
};

export const harvest = <T>(generator: () => T | undefined) => {
  const array: T[] = [];
  repeat(collect(generator, array));
  return array;
};

export const testObj = {
  fn() {
    console.log(this);
    const fnn = () => {
      console.log(this);
    };

    function fnnN() {
      // console.log(this); undefined
    }

    fnn();
    fnnN();
    return { fnn, fnnN };
  }
};

export function pubsub() {
  const subscribers: any[] = [];
  return {
    subscribe(subscriber: any) {
      subscribers.push(subscriber);
    },
    publish(publication: any) {
      // for (let i = 0; i < subscribers.length; ++i) {
      //   subscribers[i](publication); //这种方式调用函数时会动态绑定 this在数组上, 暴露该数组是不安全的
      // }
      subscribers.forEach((item) => {
        item(publication); //不会动态绑定this
      });
    }
  };
}

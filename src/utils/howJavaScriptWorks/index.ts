import { isFunction, isString, isNumber, isBool } from '..';

/**
 * 分析数值类型的本质
 * 数值 = 符号位 * 系数 * (2 ** 指数)
 * @param number
 * @returns 符号位, 整数系数, 指数, 原数值
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
 * @param original 包含占位符的原始字符串
 * @param container 生成函数或者含替换值的对象或者数组
 * @param encoder 设置的编码函数, 默认为
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

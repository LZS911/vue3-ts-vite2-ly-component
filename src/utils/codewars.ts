/* eslint-disable prefer-const */
/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-empty-function */
/* eslint-disable-next-line no-useless-escape */
import _ from 'lodash';

export const MAX_NUMBER = Math.pow(2, 31) - 1;
export const MIN_NUMBER = Math.pow(-2, 31);
export function multiply(a: number, b: number): number {
  return a + b;
}

export const digitalRoot = (n: number): number => {
  if (String(n).length === 1) {
    return n;
  }
  const sum = Array.from(String(n)).map((item) => Number(item)).reduce((item, current) => item + current);

  return digitalRoot(sum);
};

interface IObjToTree {
  id: number;
  name: string;
  pid: number;
  children?: IObjToTree[]
}

export const objToTree = (arr: IObjToTree[]) => {
  const res: any[] = [];
  for (let i = 0; i < arr.length; ++i) {
    for (let j = i + 1; j < arr.length; ++j) {
      if (arr[i].id === arr[j].pid) {
        if (!!res[i]?.children) {
          res[i].children = arr[j];
        } else {
          res.push({ ...arr[i], children: arr[j] });
        }
      }
    }
  }

  return res;
};

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
export class ListNode {
  val: number

  next: ListNode | null

  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}
export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const res = new ListNode();
  let copy = res;
  let addFlag = 0;
  while (l1 || l2 || addFlag) {
    let sum = 0;
    const tmp = (l1?.val ?? 0) + (l2?.val ?? 0);
    if (tmp >= 10) {
      sum = addFlag ? (addFlag + tmp) % 10 : tmp % 10;
      addFlag = parseInt(`${tmp / 10}`);
    } else {
      sum = addFlag ? addFlag + tmp : tmp;
      addFlag = 0;
    }
    if (sum >= 10) {
      addFlag = parseInt(`${sum / 10}`);
      sum %= 10;
    }
    const sumNode = new ListNode(sum);
    copy.next = sumNode;
    copy = sumNode;
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
  }

  return res.next;
}

const addRemote = async (a: number, b: number) => new Promise<number>((resolve) => {
  setTimeout(() => resolve(a + b), 1000);
});

export async function add(...inputs: number[]) {
  if (inputs.length === 0) {
    return 0;
  }
  if (inputs.length === 1) {
    return inputs[0];
  }

  let res = 0;
  for (const val of inputs) {
    res = await addRemote(val, res);
  }

  return res;
}

//abcdcba.  abccba.
export function judgePalindrome(target: string) {
  if (target.length === 1) return true;
  const len = target.length;
  let j = len - 1;
  for (let i = 0; i < len / 2; ++i) {
    if (target[i] !== target[j]) {
      break;
    }
    --j;
  }
  if (j > len / 2 - 1) {
    return false;
  }
  return true;
}
export function convert(target: string, numRows: number): string {
  const len = target.length;
  if (len <= 2 || numRows === 1 || len <= numRows) return target;
  let res = '';
  const map = new Map<{ x: number, y: number }, string>();
  let i = 0;

  //计算总共横向数量
  const xSum = (len / (numRows + numRows - 2)) * (numRows - 1);
  for (let x = 0; x < xSum && i < len; ++x) {
    for (let y = 0; y < numRows; ++y) {
      if (x % (numRows - 1) && x !== 0 && numRows > 2) {
        //只push一次
        map.set({ x, y: numRows - 1 - (x % (numRows - 1)) }, target[i]);
        ++i;
        break;
      }
      map.set({ x, y }, target[i]);
      ++i;
    }
  }
  for (let i = 0; i < numRows; i++) {
    map.forEach((val, key) => {
      if (key.y === i) {
        val = val ?? '';
        res += val;
      }
    });
  }

  return res;
}

export function myAtoi(target: string): number {
  ///^[\+\-]?\d+/  好好学正则吧 ...
  const str = target.trim().match(/^\+?[\-|0-9][0-9]*/);
  const res = str ? +str[0] ? +str[0] : 0 : 0;
  if (res < MIN_NUMBER) return MIN_NUMBER;
  if (res > MAX_NUMBER) return MAX_NUMBER;
  return res;
}

/**
 *   . 匹配任意单个字符
 *   * 匹配零个或多个前面的那一个元素
 * @param target
 * @param validate
 */
export function isMatch(target: string, validate: string): boolean {
  const _x = '*';
  const _d = '.';
  if ((!target && !validate) || (!target && validate) || (target && !validate)) return false;
  if (target !== validate && !validate.includes(_x) && !validate.includes(_d)) return false;
  if (validate === _d + _x) return true;

  // 只有 . 的情况
  if (validate.includes(_d) && !validate.includes(_x)) {
    if (target.length !== validate.length) return false;
    const dIndexArr = indexAll(validate, _d);
    const checkArr: number[] = [];
    for (let i = 0; i < target.length; ++i) {
      if (target[i] !== validate[i]) {
        checkArr.push(i);
      }
    }
    if (!_.isEqual(dIndexArr, checkArr)) return false;
  }

  //只有 * 的情况  target = "aab" validate = "c*a*b"
  if (!validate.includes(_d) && validate.includes(_x)) {
    //拿到 * 前面那个字符的index
    const xIndexArr = indexAll(validate, _x).map((i) => i - 1);
    if (xIndexArr.some((i) => i < 0)) throw Error(' * error');

    for (let i = 0; i < target.length; ++i) {
      if (xIndexArr.includes(i)) {
        //当前 validate_[i] 为带有 * 的字符
      } else if (target[i] !== validate[i]) return false;
    }
  }

  return true;
}

export function indexAll(params: string, target: string) {
  const res: number[] = [];
  let index = 0;
  for (let i = 0; params.includes(target); ++i) {
    index += params.indexOf(target) + (i ? 1 : 0);
    res.push(index);
    params = params.slice(params.indexOf(target) + 1);
  }

  return res;
}

export function maxArea(nums: number[]): number {
  if (nums.length < 1) return 0;
  let res = 0;
  // 暴力破解被限制 超时了
  // for (let i = 0; i < nums.length; ++i) {
  //   for (let j = i + 1; j < nums.length; ++j) {
  //     const tmp = Math.min(nums[i], nums[j]) * (j - i);
  //     res = Math.max(tmp, res);
  //   }
  // }
  // }

  /**
   * 双指针
   * 根据上面的 代码得出 伪代码 为:
   * res = max(res, min(nums[i], nums[j]) * (j - i));
   * 现在思路为 双指针该移动哪一根?
   * 转化为数学题:
   * 当移动当前值较大的指针较移动当前值较小的指针面积 变小了 (核心)
   * 所以每次移动 移动 值较小的
   */
  let i = 0;
  let j = nums.length - 1;

  while (i < j) {
    let tmp = Math.min(nums[i], nums[j]) * (j - i);
    res = Math.max(tmp, res);
    if (nums[i] > nums[j]) j--;
    else i++;
  }
  return res;
}
export function isSpecial(num: number) {
  if ((num > 10 && num % 10)) return '';
  while (num > 10) {
    num /= 10;
  }

  if (10 - num === 1 || 5 - num === 1) return true;
  return false;
}

export function getNumberArr(num: number) {
  if (!num) return [0];
  const res: number[] = [];
  while (num) {
    res.push(num % 10);
    num = parseInt((num / 10).toString());
  }
  return res;
}

export function intToRoman(num: number): string {
  // 题目限制  1 <= num <= 3999
  let res = '';

  if (num < 1 || num > 3999) return res;

  //拿到数组形式的数据   expect(getNumberArr(1234)).toEqual([4, 3, 2, 1]);
  const nums = getNumberArr(num);
  let p = '';
  let q = '';
  let z = '';
  nums.forEach((item, index) => {
    if (!item) return;
    switch (index) {
      //个位数下的情况
      case 0:
        p = 'I';
        q = 'V';
        z = 'X';
        break;
      //十位数下的情况
      case 1:
        p = 'X';
        q = 'L';
        z = 'C';
        break;
      //百位位数下的情况
      case 2:
        p = 'C';
        q = 'D';
        z = 'M';
        break;
      case 3:
        //千位数下的情况
        p = 'M';
        q = '';
        break;
      default: break;
    }

    //计算倍数
    let multiple = 1;
    while (index > 0 && index--) {
      multiple * 10;
    }
    //计算当前的值  1234 对应的四次值 为 4, 30, 200, 1000
    const current = item * multiple;

    //如果是 4 或 9 的情况
    if (isSpecial(current)) {
      if (current % 4) {
        //为 9, 按照要求拼接字符串
        res = `${p}${z}${res}`;
      } else {
        //为4
        res = `${p}${q}${res}`;
      }
    } else if (item === 5) {
      //为 5
      res = `${q}${res}`;
    } else if (item < 5) {
      //小与 5
      while (item--) {
        res = `${p}${res}`;
      }
    } else {
      //大与 5, 取出减去 5的余数, 然后拼接
      let tmp = item - 5;
      while (tmp--) {
        res = `${p}${res}`;
      }
      res = q + res;
    }
  });

  return res;
}

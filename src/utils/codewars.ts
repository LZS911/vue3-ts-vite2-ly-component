/* eslint-disable no-lonely-if */
/* eslint-disable no-multi-assign */
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
import { tmpdir } from 'os';

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
  //只考虑 为10 的整数倍
  if ((num > 10 && num % 10)) return false;
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
    // let multiple = 1;
    // while (index > 0 && index--) {
    //   multiple * 10;
    // }
    //计算当前的值  1234 对应的四次值 为 4, 30, 200, 1000
    // const current = item * multiple;

    //如果是 4 或 9 的情况
    // if (isSpecial(current)) {
    //   if (current % 4) {
    //     //为 9, 按照要求拼接字符串
    //     res = `${p}${z}${res}`;
    //   } else {
    //     //为4
    //     res = `${p}${q}${res}`;
    //   }
    // }

    if (item === 4) {
      res = `${p}${q}${res}`;
    } else if (item === 9) {
      res = `${p}${z}${res}`;
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

export function inToRoman2(num: number) {
  // int values[]={1000,900,500,400,100,90,50,40,10,9,5,4,1};
  // string reps[]={"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
  //大佬 思维
  let res = '';
  if (num < 1 || num > 3999) return res;

  const map = new Map<number, string>([
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'],
    [5, 'V'], [4, 'IV'], [1, 'I']]);
  map.forEach((val, key) => {
    while (num >= key) {
      num -= key;
      res += val;
    }
  });
  return res;
}

export function longestCommonPrefix(strs: string[]): string {
  let res = '';
  /** */
  if (strs.includes('') || !strs.length) return res;
  if (strs.length === 1) return strs[0];

  const tmpArr: string[] = [];

  strs.forEach((str) => {
    // Array.from(str).forEach((s, index) => {
    //   tmpArr[index] = (tmpArr[index] ? tmpArr[index] : '') + s;
    // });
    for (let i = 0; i < strs[0].length; ++i) {
      tmpArr[i] = (tmpArr[i] ? tmpArr[i] : '') + (str[i] ?? ' ');
    }
  });

  for (let i = 0; i < tmpArr.length; ++i) {
    const tmp = tmpArr[i];
    if (/^(\w)\1{1,}$/.test(tmp)) {
      res += tmp[0];
    } else {
      break;
    }
  }

  return res;
}

export function generateArr(strs: string[]) {
  const tmpArr: string[] = [];

  strs.forEach((str) => {
    // Array.from(str).forEach((s, index) => {
    //   tmpArr[index] = (tmpArr[index] ? tmpArr[index] : '') + s;
    // });
    for (let i = 0; i < strs[0].length; ++i) {
      tmpArr[i] = (tmpArr[i] ? tmpArr[i] : '') + (str[i] ?? ' ');
    }
  });
  return tmpArr;
}

export function threeSum(nums: number[]): number[][] {
  const res: number[][] = [];
  if (nums.length < 3) return [];
  let list = nums;
  nums.forEach((item) => {
    let tmp: number[] = [];
    list = removeArr(list, item);
    tmp = (getArrByAdd(list, getOppositeNumber(item)));
    if (tmp.length > 0) {
      for (let i = 0; i < tmp.length; i += 2) {
        const val = [item, ...tmp.slice(i, i + 2)].sort((a, b) => a - b);
        let flag = true;
        if (res.length) {
          res.forEach((item) => {
            if (item[0] === val[0] && item[1] === val[1] && item[2] === val[2]) {
              flag = false;
            }
          });
        }
        flag && res.push(val);
      }
    }
  });
  return res;
}

export function getArrByAdd(arr: number[], num: number) {
  const map = new Map<number, number>();
  const tmp: number[] = [];
  for (let i = 0; i < arr.length; ++i) {
    if (map.has(arr[i]) && !tmp.includes(arr[i])) {
      tmp.push(arr[map.get(arr[i])!]);
      tmp.push(arr[i]);
    }
    map.set(num - arr[i], i);
  }
  return tmp;
}

export function getOppositeNumber(num: number) {
  return ~num + 1;
}

export function removeArr<T>(arr: T[], value: T) {
  let index = arr.findIndex((p) => p === value);
  return arr.filter((val, _index) => index !== _index);
}

//-1, 2, 1, -4  ===> -4, -1, 1, 2
// 1, 4, 3, -4, 2], 1 ===> -4, 1, 2, 3, 4
export function threeSumClosest(nums: number[], target: number): number {
  if (nums.length < 3) return 0;
  nums.sort((a, b) => a - b);
  const tmp: number[] = [];
  for (let i = 1; i < nums.length - 1; ++i) {
    let j = 0;
    let k = nums.length - 1;
    while (j < k) {
      const val = nums[i] + nums[j] + nums[k];
      if (val === target) return target;
      if (val < target) {
        if (++j === i) ++j;
      }
      if ((val > target)) {
        if (--k === i) --k;
      }
      tmp.push(val);
    }
  }
  const min = tmp.map((item) => Math.abs(target - item)).sort((a, b) => a - b)[0];
  const index = tmp.map((item) => Math.abs(target - item)).findIndex((item) => item === min);
  return tmp[index];
}

export function letterCombinations(digits: string) {
  let res: string[] = [];
  const tmp: string[][] = [];
  if (!digits || Array.from(digits).some((item) => +item < 2)) return res;
  const map = new Map([
    [2, ['a', 'b', 'c']],
    [3, ['d', 'e', 'f']], [4, ['g', 'h', 'i']],
    [5, ['j', 'k', 'l']], [6, ['m', 'n', 'o']],
    [7, ['p', 'q', 'r', 's']], [8, ['t', 'u', 'v']],
    [9, ['w', 'x', 'y', 'z']]
  ]);

  for (let i = 0; i < digits.length; ++i) {
    if (map.has(+digits[i])) tmp.push(map.get(+digits[i])!);
  }

  res = tmp.reduce((res, current) => flatArray<string>(res.map((r) => current.map((c) => r + c))));

  return res;
}

//数组降维
export function flatArray<T>(arr: any[]): T[] {
  return arr.reduce((res, current) => Array.isArray(current) ? [...res, ...flatArray(current)] :
    [...res, current], []);
}

export function fourSum(nums: number[], target: number): number[][] {
  const res: number[][] = [];
  if (!nums.length) return res;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; ++i) {
    for (let j = i + 1; j < nums.length; ++j) {
      let k = j + 1;
      let l = nums.length - 1;
      while (k < l) {
        const val = nums[i] + nums[j] + nums[k] + nums[l];
        if (val === target) {
          let flag = true;
          res.forEach((item) => {
            if (item[0] === nums[i] && item[1] === nums[j] && item[2] === nums[k] && item[3] === nums[l]) {
              flag = false;
            }
          });
          if (flag) {
            const tmp: number[] = [];
            tmp.push(nums[i]);
            tmp.push(nums[j]);
            tmp.push(nums[k]);
            tmp.push(nums[l]);
            res.push(tmp);
          }

          k++;
          l--;
        }

        if (val < target) k++;
        if (val > target) l--;
      }
    }
  }
  console.log(res);

  return res;
}

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

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head || !head.next) return null;
  //head 长度
  let length = 1;
  let target = null;
  let next = head;
  while (next.next) {
    next = next.next as any;
    length++;
  }
  let next2 = new ListNode();
  next2 = head;
  for (let i = 0; i < length; ++i) {
    if (i === length - n - 1) {
      target = new ListNode();
      target = next2;
    }
    next2 = next2?.next!;
  }
  if (!!target) {
    target.next = target?.next?.next ?? null;
  } else {
    return head.next;
  }

  return head;
}

export function removeNthFromEnd2(head: ListNode | null, n: number): ListNode | null {
  if (!head || !head.next) return null;
  //快指针
  let fast = head;
  //慢指针
  let slow = head;
  while (n--) {
    //先将快指针 走 n 步
    if (!fast.next) {
      return head.next;
    }
    fast = fast.next;
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next!;
  }
  slow.next = slow.next!.next;
  return head;
}

/**
 *
 *
 题目描述:
给定一个只包括  ('，')'，'{'，'}'，'['，'] 的字符串 s ，判断字符串是否有效。
有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

限制:
1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成
 *
 大致思路:
 先判断出不符合条件的几种情况:
  1. 长度为奇数, 分为一下两种情况:
  · 左边的括号多一个   expect(isValid('(){}[')).toBe(false);
  · 右边的括号多一个   expect(isValid('(){}[]]')).toBe(false);
  2. 符号对应不上     expect(isValid('(}')).toBe(false);
 *
 * @param s : 需要判断的字符串
 */
export function isValid(s: string): boolean {
  //添加限制
  if (s.length < 1 || s.length > 104 || !(/^[\{\}\(\)\[\]]+$/.test(s))) return false;
  //奇数直接false
  if (s.length % 2) return false;

  //建立数组, 用来比较
  const st: string[] = [];

  //建立对应关系字典
  const map: { [key: string]: string } = Object.create(null);
  map['('] = ')';
  map['{'] = '}';
  map['['] = ']';

  //遍历字符串
  for (let i = 0; i < s.length; ++i) {
    // 如果当前为左括号 将左括号对应的右括号push进数组
    if (map[s[i]]) st.push(map[s[i]]);

    /**
     * 当前分支为s[i]为 右括号 值
     * pop:弹出数组最后push进去的元素(栈 后进先出原则)
     * 利用数组pop函数的返回值(移出的元素), 用来和s[i]对比,
     * 如果符合对称关系, 则其应该相等, 如若有不相等, 则返回false
     */
    else if (s[i] !== st.pop()) {
      return false;
    }
  }

  //若成功pop完数组, 并且数组内容为空, 则符合条件
  return !st.length;
}
/*
 * 题目描述:
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 大致思路:
 * 比较 l1和 l2 的 val,
 * @param l1
 * @param l2
 */
export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!l1 && !l2) return null;
  let tmp = new ListNode();
  let res = tmp;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      tmp.next = l1;
      l1 = l1.next;
    } else {
      tmp.next = l2;
      l2 = l2.next;
    }
    tmp = tmp.next;
  }
  //有一个为空
  if (!l1) {
    //l1 为空
    tmp.next = l2;
  } else {
    //l2 为空
    tmp.next = l1;
  }
  return res.next;

  //大佬递归思路
  // if (l1!.val < l2!.val) {
  //   l1!.next = mergeTwoLists(l1?.next ?? null, l2);
  //   return l1;
  // }
  // l2!.next = mergeTwoLists(l1, l2!.next ?? null);
  // return l2;
}

/**
 *
 * @param n
 *
 * 题目描述:
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * 示例 1：
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 * 示例 2：
 * 输入：n = 1
 * 输出：["()"]
 *
 * res: 返回值
 * resStr: 返回值的每一项, 长度为2n
 *
 * 规则 resStr 以 '(' 开头, 以')'结尾
 * += 一次 '(' 对应 += 一次 ')'
 *
 * 难点: res 的长度怎么得到?
 *
 */

export function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  let tmp: string[] = [];

  for (let i = 0; i < 3; ++i) {
    tmp.push('(');
  }
  for (let i = 0; i < 3; ++i) {
    tmp.push(')');
  }

  const generateStr = () => {
    let str = '(';
    let count = 1;

    return { str, count };
  };
  return res;
}

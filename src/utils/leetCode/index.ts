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
import { deepClone } from '../base';

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
  return arr.filter((_, _index) => index !== _index);
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
 */

export function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  /**
   *
   * @param lCount 左括号数量
   * @param rCount 右括号数量
   * @param str  拼接的字符串
   */
  const generateStr = (lCount: number, rCount: number, str: string) => {
    //递归什么时候结束:  当 lCount === 0 &&  rCount === 0
    if (lCount === 0 && rCount === 0) {
      res.push(str);
      return;
    }
    //左侧括号还有剩余
    lCount > 0 && generateStr(lCount - 1, rCount, `${str}(`);
    //左侧括号小于右侧括号
    lCount < rCount && generateStr(lCount, rCount - 1, `${str})`);
  };
  generateStr(n, n, '');

  return res;
}
/**
 *
 // 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
//
// 说明:
// 为什么返回数值是整数，但输出的答案是数组呢?
// 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
// 你可以想象内部操作如下:
// // nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
// int len = removeDuplicates(nums);
// // 在函数里修改输入数组对于调用者是可见的。
// // 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
// for (int i = 0; i < len; i++) {
//  print(nums[i]);
// }
//
// 示例 1：

// 输入：nums = [1,1,2]
// 输出：2, nums = [1,2]
// 解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
// 示例 2：

// 输入：nums = [0,0,1,1,1,2,2,3,3,4]
// 输出：5, nums = [0,1,2,3,4]
// 解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。

* @param nums
* @returns
*/

export function removeDuplicates(nums: number[]): number {
  // while (i < len && nums[i] !== undefined) {
  //   if (nums[i + 1] === nums[i]) {
  //     nums.splice(i + 1, 1);
  //   } else {
  //     i += 1;
  //   }
  // }
  // return nums.length;

  let fast = 1;
  let slow = 0;
  while (fast < nums.length) {
    if (nums[fast] > nums[slow]) nums[++slow] = nums[fast];
    fast++;
  }
  return ++slow;
}

/**
 *
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
  不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
  元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
   输入：nums = [0,1,2,2,3,0,4,2], val = 2
   输出：5, nums = [0,1,4,0,3]

   [1, 2, 3] 1 => [2, 3]
 * @param nums
 * @param val
 */
export function removeElement(nums: number[], val: number): number {
  let fast = 0;
  let slow = 0;

  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  return slow;
}

/**
 *
 * @param haystack 实现 strStr() 函数。

给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  -1 。

说明：

当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。

示例 1：

输入：haystack = "hello", needle = "ll"
输出：2
示例 2：

输入：haystack = "aaaaa", needle = "bba"
输出：-1
示例 3：

输入：haystack = "", needle = ""
输出：0
 * @param needle
 */
export function strStr(haystack: string, needle: string): number {
  if (!needle.length) return 0;
  let index = -1;
  for (let i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle[0] && haystack.substring(i, needle.length + i) === needle) {
      index = i;
      break;
    }
  }

  return index;
}
/**
 * 返回数组中所有包含的项的一个数组
 * @param params 原始字符串
 * @param target 目标值
 * @returns number[]
 */
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
/**
 * 给定一个字符串 s 和一些 长度相同 的单词 words 。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
注意子串要与 words 中的单词完全匹配，中间不能有其他字符 ，但不需要考虑 words 中单词串联的顺序。
示例 1：
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
示例 2：
输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]
示例 3：
输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
输出：[6,9,12]
 */
export function findSubstring(s: string, words: string[]): number[] {
  if (!s.length || !words.length) return [];
  let res: number[] = [];
  //递归 暴力破解失败, 超时 --
  // let len = words[0].length * words.length;
  // const generateWord = (str: string, arr: string[]) => {
  //   if (str.length === len) {
  //     for (let i = 0; i < s.length; ++i) {
  //       if (s[i] === str[0] && s.substring(i, str.length + i) === str) {
  //         res.push(i);
  //       }
  //     }
  //     return;
  //   }
  //   arr.forEach((item: string) => {
  //     let res = str + item;
  //     generateWord(res, removeArr(arr, item));
  //   });
  // };
  // generateWord('', words);

  // const wordLen = words[0].length;
  // //换个思路
  // for(let i = 0; i < s.length; ++i){
  //   for(let j = 0; j < words.length; ++j){
  //     if(s.substring(i, wordLen) === words[j]){

  //     }
  //   }
  // }

  return res;
}

/**
 * 找出这个数组排序出的所有数中，刚好比当前数大的那个数

比如当前 nums = [1,2,3]。这个数是123，找出1，2，3这3个数字排序可能的所有数，排序后，比123大的那个数 也就是132

如果当前 nums = [3,2,1]。这就是1，2，3所有排序中最大的那个数，那么就返回1，2，3排序后所有数中最小的那个，也就是1，2，3 -> [1,2,3]

[1, 4, 3, 5] => 1 4 5 3
[1, 4, 5, 3] => 1 5 4 3
 * @param nums
 */
export function nextPermutation(nums: number[]): void {
  let flag = true;
  for (let i = nums.length - 1; i > 0; --i) {
    if (nums[i - 1] < nums[i] && flag) {
      flag = false;
      let min = Math.min(...nums.slice(i, nums.length).filter((item) => item > nums[i - 1]));
      if (nums[i - 1] < min) {
        let minIndexOf = nums.slice(i, nums.length).indexOf(min) + i;
        let tmp = nums[i - 1];
        nums[i - 1] = nums[minIndexOf];
        nums[minIndexOf] = tmp;
      } else {
        let tmp = nums[i - 1];
        nums[i - 1] = nums[i];
        nums[i] = tmp;
      }
      for (let j = 0; j < nums.length - i - 1; j++) {
        for (let k = i; k < nums.length - j - 1; k++) {
          if (nums[k] > nums[k + 1]) {
            let tmp = nums[k];
            nums[k] = nums[k + 1];
            nums[k + 1] = tmp;
          }
        }
      }
    }
  }
  if (flag) nums.sort((a, b) => a - b);
}
/**
 *
 * @param matrix 给你一个 m x n 的矩阵 matrix 。如果这个矩阵是托普利茨矩阵，返回 true ；否则，返回 false 。

如果矩阵上每一条由左上到右下的对角线上的元素都相同，那么这个矩阵是 托普利茨矩阵 。

示例 1：

输入：matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
输出：true
解释：
在上述矩阵中, 其对角线为:
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]"。
各条对角线上的所有元素均相同, 因此答案是 True 。
 */

export function isToeplitzMatrix(matrix: number[][]): boolean {
  const comparison = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const itemLen = matrix[0].length;
  for (let i = 0; i < matrix.length - 1; ++i) {
    const arr1 = matrix[i].slice(0, itemLen - 1);
    const arr2 = matrix[i + 1].slice(1, itemLen);
    const diff = comparison(arr1, arr2);
    if (!diff) {
      return false;
    }
  }
  return true;
}

/**
 *
 * @param s
 *   给定字符串J  代表石头中宝石的类型，和字符串  S代表你拥有的石头。  S  中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。

J  中的字母不重复，J  和  S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。

示例 1:

输入: J = "aA", S = "aAAbbbb"
输出: 3
示例 2:

输入: J = "z", S = "ZZ"
输出: 0

 */
export function numJewelsInStones(jewels: string, stones: string): number {
  let num = 0;
  for (let i = 0; i < stones.length; ++i) {
    if (jewels.includes(stones[i])) {
      num++;
    }
  }
  return num;
}

/**
 *
 * @param n
 * 在第一行我们写上一个 0。接下来的每一行，将前一行中的0替换为01，1替换为10。
给定行数  N  和序数 K，返回第 N 行中第 K个字符。（K从1开始）

例子:

输入: N = 1, K = 1
输出: 0

输入: N = 2, K = 1
输出: 0

输入: N = 2, K = 2
输出: 1

输入: N = 4, K = 5
输出: 1

解释:
第一行: 0
第二行: 01
第三行: 01 10
第四行: 01 10 10 01
第五行: 01 10 10 01 10 01 01 10
第六行: 01 10 10 01 10 01 01 10 10 01 01 10 01 10 10 01

1 ==> 0
2 ==> 1
3 ==> 1
4 ==> 0
5 ==> 1
6 ==> 0
7 ==> 0
8 ==> 1

 * @param k
 */
export function kthGrammar(n: number, k: number): number {
  if (k > Math.pow(2, n - 1) || k < 1) throw Error('expect k');
  if (k === 1) return 0;
  if (k === 2) return 1;

  // 暴力 递归 超时...
  // const res: number[][] = [];
  // const fn = (nums: number[], i: number) => {
  //   if (i >= n) return;
  //   res[i] = Array.isArray(res[i]) ? [...res[i], ...nums] : nums;
  //   nums.forEach((item) => {
  //     if (item === 0) fn([0, 1], i + 1);
  //     if (item === 1) fn([1, 0], i + 1);
  //   });
  // };

  // fn([0], 0);
  // return res[n - 1]?.[k - 1] ?? 0;

  //超出数组长度...
  // const res = Array.from({ length: n }).reduce((res: number[], current) => {
  //   // console.log(res, current);
  //   const tmp: number[] = [];
  //   res.forEach((item) => {
  //     item === 0 ? tmp.push(...[0, 1]) : tmp.push(...[1, 0]);
  //   });
  //   return tmp;
  // }, [0]);
  // return res[k - 1] ?? 0;

  //找规律
  const len = Math.pow(2, n - 1);
  if (k > len / 2) {
    return kthGrammar(n - 1, k - len / 2) === 0 ? 1 : 0;
  }
  return kthGrammar(n - 1, k);
}

/**
 *
 * @param target
 *  描述
在一个二维数组array中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
[
[1,2,8,9],
[2,4,9,12],
[4,7,10,13],
[6,8,11,15]
]
给定 target = 7，返回 true。

给定 target = 3，返回 false。

0 <= array.length <= 500
0 <= array[0].length <= 500

示例1
输入：
7,[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]]
复制
返回值：
true
复制
说明：
存在7，返回true
示例2
输入：
3,[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]]
复制
返回值：
false
复制
说明：
不存在3，返回false

0 <= array.length <= 500
0 <= array[0].length <= 500
 * @param array
 */
export function Find(target: number, array: number[][]): boolean {
  if (array.length === 0) return false;
  // return array.some((item) => item.some((num) => num === target));
  // return array.flat().includes(target);
  /**
   * [
   * [1, 3, 4, 5],
   * [2, 4, 6, 8],
   * [3, 6, 9, 11],
   * [4, 8, 12, 15],
   * [5, 10, 15, 16],
   * ]
   */
  //高
  const rowLen = array.length;
  //宽
  const colLen = array[0].length;
  //左下角
  let i = rowLen - 1;
  let j = 0;
  while (i >= 0 && j <= colLen - 1) {
    //当前值比 target小, 指针右移
    if (array[i][j] < target) j++;
    //当前值比 target 大, 指针上移
    else if (array[i][j] > target) i--;
    else if (array[i][j] === target) return true;
  }
  return false;
}

/**
 *
 * @param nums
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

进阶：

你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？

示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]

 * @param target
 */
export function searchRange(nums: number[], target: number): number[] {
  const res: number[] = [];
  if (nums.length === 0 || nums[0] > target) return [-1, -1];

  // let i = 0;
  // let j = nums.length - 1;
  // while (i <= j) {
  //   const mid = Math.floor((i + j) / 2);
  //   if (nums[mid] === target) {
  //     let a = mid;
  //     let b = mid;
  //     while (a >= 0) {
  //       if (nums[--a] !== target) {
  //         res.push(a + 1);
  //         break;
  //       }
  //     }
  //     while (b <= nums.length - 1) {
  //       if (nums[++b] !== target) {
  //         res.push(b - 1);
  //         break;
  //       }
  //     }
  //     return res;
  //   }

  //   if (nums[mid] > target) {
  //     j = mid - 1;
  //   } else if (nums[mid] < target) {
  //     i = mid + 1;
  //   }
  // }
  const find = (model: 'left' | 'right') => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        result = mid;
        if (model === 'left') {
          right = mid - 1;
        } else if (model === 'right') {
          left = mid + 1;
        }
      }

      if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      }
    }
    return result;
  };
  res[0] = find('left');
  res[1] = find('right');
  return res;
}

/**
 * @param arr 需要进行排序的原始数组
 * @param start 需要进行排序的原始数组起始项的索引
 * @param end 需要进行排序的原始数组结束项的索引
 */
export const quickSort = (arr: number[], start: number = 0, end: number = arr.length - 1) => {
  let left = start;
  let right = end;
  if (end - start < 1 || start < 0 || end < 0) {
    return;
  }
  const flag = arr[left];

  while (left !== right) {
    while (left !== right && arr[right] >= flag) right--;
    arr[left] = arr[right];

    while (left !== right && arr[left] <= flag) left++;
    arr[right] = arr[left];
  }
  arr[left] = flag;
  quickSort(arr, start, left - 1);
  quickSort(arr, left + 1, end);
};

/**
 * 搜索插入位置
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，
返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums 为无重复元素的升序排列数组
-104 <= target <= 104
 * @param nums
 * @param target
 */
export function searchInsert(nums: number[], target: number): number {
  if (nums.length === 0) return 0;
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  if (nums[left] >= target) return left;
  return left + 1;
}

export function searchInsertRecursion(nums: number[], target: number, start: number = 0, end: number = nums.length - 1): number {
  if (nums.length === 0) return 0;
  if (end - start < 1) {
    if (nums[start] >= target) {
      return start;
    }
    return start + 1;
  }

  const mid = Math.floor((start + end) / 2);
  if (nums[mid] === target) return mid;

  return nums[mid] > target
    ? searchInsertRecursion(nums, target, start, mid - 1)
    : searchInsertRecursion(nums, target, mid + 1, end);
}

export const checkVersion = (version: string, currentVersion: string) => {
  const versionArr = version.split('.');
  const currentArr = currentVersion.split('.');

  if (!(/^\d+.\d+.\d+$/.test(version)) || !(/^\d+.\d+.\d+$/.test(currentVersion))) {
    return 'error';
  }

  for (let i = 0; i < versionArr.length; ++i) {
    if (i < 2 && Number(currentArr[i]) > Number(versionArr[i])) {
      return 'upgradeVersionTooHigh';
    }
    if (Number(currentArr[i]) < Number(versionArr[i])) {
      return 'upgradeVersionTooLow';
    }
  }

  return '';
};

export function isValidSudoku(board: string[][]): boolean {
  /*
     实现一个id生成器, 将 . 转化成 不相同且以1递增的参数
     当然也有别的处理方式, 这里这样处理只是因为最近有看到讲闭包的文章用这个栗子, 于是试下手
  */
  const integer = (from: number, to: number = Infinity, step: number = 1) => () => {
    if (from < to) {
      const result = from;
      from += step;
      return result;
    }
    return -1;
  };

  //创建id生成器, 以10开始, 避免和已有数据冲突
  const generateId = integer(10);

  /**
   * 数组转换函数, 将 string[] => number[]
   * 1. 若值为 ., 转化为任意递增不重复的id
   * 2. 若值不符合规则, 返回-1, 后续判断时若数组中含有-1, 则返回false
   * 3. 返回转化为数值后的值
   **/
  const transform = (str: string) => {
    if (str === '.') return generateId();
    if (Number.isNaN(Number(str))) return -1;
    if (Number(str) < 1 || Number(str) > 9) return -1;
    return Number(str);
  };

  /**
   * 规则校验函数
   * 1. 判断数组中是否含有-1, 若有, 则为false
   * 2. 判断数组中时候含有重复的数据, 通过 ES6 Set 转换后比较长度即可, 当长度不相同时, 即包含重复值, 返回false
   */
  const checkValid = (arr: number[]) => !arr.includes(-1) && (([...new Set(arr)]).length === arr.length);

  for (let i = 0; i < board.length; ++i) {
    // 对二维数组中横向数组做校验, 有不符合规则的直接返回false
    if (!checkValid(board[i].map(transform))) {
      return false;
    }

    // 二维数组中的纵向数组
    const verticalArr: number[] = [];
    // 九空格数组
    let sudokuArr: number[] = [];

    for (let j = 0; j < board.length; ++j) {
      //这里获取的是纵向数组
      verticalArr.push(transform(board[j][i]));

      if (!(i % 3) && j !== 0 && !(j % 3)) {
        //纵向每 3 列进行一次校验
        if (!checkValid(sudokuArr)) {
          return false;
        }

        //校验完后且符合规则后清空数组, 用来下次存储九空格数据
        sudokuArr = [];
      }

      //获取九宫格数组
      !(i % 3) && sudokuArr.push(...board[j].slice(i, i + 3).map(transform));
    }

    //校验纵向数组, 这里需要注意的是还需要校验一次九宫格数组, 因为上面循环中最后三列的九宫格在循环中不会进行校验
    if (!checkValid(verticalArr) || !checkValid(sudokuArr)) {
      return false;
    }
  }

  return true;
}

export function groupBy1<T>(arr: T[], key?: string) {
  const map = new Map<any, number>();
  return arr.reduce((acc, cur: any, index) => {
    const val = key ? cur[key] as any : cur;
    if (map.has(val)) {
      acc[map.get(val)!].push(cur);
    } else {
      map.set(val, acc.length);
      acc.push([cur]);
    }
    return acc;
  }, [] as T[][]);
}

export function groupBy(arr: string[]) {
  const initVal: string[][] = [];
  const map = new Map<string, number>();
  return arr.reduce((acc, cur, index) => {
    if (map.has(cur) && acc.length - 1 === map.get(cur)!) {
      acc[map.get(cur)!].push(cur);
    } else {
      map.set(cur, acc.length);
      acc.push([cur]);
    }
    return acc;
  }, initVal);
}

export function transformArr(arr: string[][]) {
  const transform = (len: number, val: string) => String(len) + val;
  let res = '';
  arr.forEach((item) => {
    const len = item.length;
    const val = item[0];
    res += transform(len, val);
  });

  return res;
}

export function countAndSay(n: number) {
  if (n < 1 || n > 30) return '';

  if (n === 1) return '1';

  let str = '';
  while (--n) {
    const arr = groupBy(Array.from(str || '1'));
    str = transformArr(arr);
  }

  return str;
}

/**
 *
 * @param candidates 给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，'
 * 找出 candidates 中所有可以使数字和为目标数 target 的唯一组合。

candidates 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。

对于给定的输入，保证和为 target 的唯一组合数少于 150 个。
 * @param target
 */
export function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];

  if (candidates.length === 0) {
    return [];
  }

  const fn = (residue: number, path: number[], index: number) => {
    if (path.length > 150) {
      return;
    }
    if (residue === 0) {
      res.push([...path]);
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      if (candidates[i] > residue) {
        continue;
      }
      path.push(candidates[i]);

      fn(residue - candidates[i], path, i);

      path.pop();
    }
  };

  fn(target, [], 0);

  return res;
}

/**
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

注意：解集不能包含重复的组合。
 * @param candidates
 * @param target
 * @returns
 */
export function combinationSum2(candidates: number[], target: number): number[][] {
  const res: number[][] = [];

  if (candidates.length === 0) {
    return [];
  }

  candidates.sort((a, b) => a - b);
  const fn = (residue: number, path: number[], index: number) => {
    if (residue === 0) {
      res.push([...path]);
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      if (candidates[i] > residue) {
        continue;
      }
      if (i > index && candidates[i] === candidates[i - 1]) {
        continue;
      }
      path.push(candidates[i]);

      fn(residue - candidates[i], path, i + 1);

      path.pop();
    }
  };

  fn(target, [], 0);
  return res;
}

//全排列
export function fullPermutation(nums: number[]) {
  const res: number[][] = [];

  const fn = (index: number, path: number[]) => {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = index; i < nums.length; ++i) {
      path.push(nums[i]);
      fn(i, path);
      path.pop();
    }
  };

  fn(0, []);

  return res;
}

/**
 * 41. 缺失的第一个正数
给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

示例 1：

输入：nums = [1,2,0]
输出：3
示例 2：

输入：nums = [3,4,-1,1]
输出：2
示例 3：

输入：nums = [7,8,9,11,12]
输出：1
 * @param nums
 */
export function firstMissingPositive(nums: number[]): number {
  const len = nums.length;
  for (let i = 0; i < len; ++i) {
    while (nums[i] > 0 && nums[i] !== i && nums[i] !== nums[nums[i]]) {
      const val = nums[i];
      const tmp = nums[i];
      nums[i] = nums[val] ?? 0;
      nums[val] = tmp;
    }
  }
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] !== i && i > 0) {
      return i;
    }
  }
  return nums.length;
}

/**
 *
 * @param nums 给你一个非负整数数组 nums ，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

假设你总是可以到达数组的最后一个位置。

示例 1:

输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
示例 2:

输入: nums = [2,3,0,1,4]
输出: 2

1 <= nums.length <= 104
0 <= nums[i] <= 1000
 */
export function jumpEnd(nums: number[]) {
  //需要跳的总数
  const needJump = nums.length - 1;
}

/**
 *
  const obj = {
      a: { b: 1, c: 2 },
      d: {
        e: 3,
        f: {
          g: 4,
          h: 5,
        },
      },
      i: {
        j: 6,
        k: {
          l: 7,
          m: 8,
        },
      },
    };
    {value:7, key:'l'}  ===> ['i', 'k', 'l']
    {value:7, key:'m'}  ===> null
 */
export function getObjPath(obj: { [key in string]: any }, keyValue: { key: string, value: number }): string[][] {
  const result: string[][] = [];
  const fn = (o: { [key in string]: any }, count: number = 0) => {
    const res = Object.keys(o).reduce((acc, cur) => {
      const val = o[cur];
      if (typeof val !== 'number') {
        const arr = fn(val, count + 1);
        if (arr) {
          acc = [cur, ...arr];
          count === 0 && result.push(acc);
        }
      } else if (keyValue.key === cur && keyValue.value === val) {
        acc.push(cur);
      }
      return acc;
    }, [] as string[]);

    return res.length ? res : null;
  };

  fn(obj);

  return result;
}

/**
 *
 * @param nums 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
示例 2：

输入：nums = [0,1]
输出：[[0,1],[1,0]]
示例 3：

输入：nums = [1]
输出：[[1]]
 */

export function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  if (nums.length === 0) {
    return [];
  }

  const fn = (path: number[], arr: number[]) => {
    if (arr.length === 0) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < arr.length; ++i) {
      const tmp = [...path, arr[i]];
      fn(tmp, arr.filter((item) => item !== arr[i]));
    }
  };

  fn([], nums);
  return res;
}

export function permuteUnique(nums: number[]): number[][] {
  const res: number[][] = [];
  if (nums.length === 0) {
    return [];
  }
  nums.sort((a, b) => a - b);

  const fn = (path: number[], arr: number[]) => {
    if (arr.length === 0) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] !== arr[i - 1]) {
        const tmp = [...path, arr[i]];
        fn(tmp, removeArr(arr, arr[i]));
      }
    }
  };

  fn([], nums);
  return res;
}

/**
 *
 * @param matrix 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

示例 1：

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]

 */
export function rotateArr(matrix: number[][]): void {
  const len = matrix.length;
  for (let i = 0; i < len; ++i) {
    for (let j = 0; j <= Math.floor((len - 1) / 2); ++j) {
      [matrix[i][j], matrix[i][len - j - 1]] = [matrix[i][len - j - 1], matrix[i][j]];
    }
  }
  let count = 1;
  let index = len - 1;
  for (let j = 0; j < len - 1 && index >= 0; ++j) {
    let m = index - 1;
    let n = count++;
    while (m >= 0 && n < len) {
      [matrix[j][m], matrix[n][len - j - 1]] = [matrix[n][len - j - 1], matrix[j][m]];
      m--;
      n++;
    }
    index--;
  }
}

const getCount = (s: string, str: string) => {
  let count = 0;
  for (let i = 0; i < str.length; ++i) {
    if (str[i] === s) {
      count++;
    }
  }
  return count;
};
export const judgeStr33 = (str: string, target: string) => {
  if (str.length !== target.length) return false;
  const letterToPrime = new Map<string, number>(
    [
      ['a', 2],
      ['b', 3],
      ['c', 5],
      ['d', 7],
      ['e', 11],
      ['f', 13],
      ['g', 17],
      ['h', 19],
      ['i', 101],
      ['j', 23],
      ['k', 29],
      ['l', 31],
      ['m', 37],
      ['n', 41],
      ['o', 43],
      ['p', 47],
      ['q', 53],
      ['r', 59],
      ['s', 61],
      ['t', 67],
      ['u', 71],
      ['v', 73],
      ['w', 79],
      ['x', 83],
      ['y', 89],
      ['z', 97],
    ]
  );
  const product1 = Array.from(str).reduce((acc, cur) => acc * letterToPrime.get(cur)!, 1);
  const product2 = Array.from(target).reduce((acc, cur) => acc * letterToPrime.get(cur)!, 1);
  return product1 === product2;
};
export const judgeStr1 = (str: string, targetStr: string) =>
  str.length === targetStr.length
  && Array.from(str).every((s) => targetStr.includes(s) && getCount(s, targetStr) === getCount(s, str));
export function groupAnagrams(strs: string[]): string[][] {
  const getCount = (s: string, str: string) => {
    let count = 0;
    for (let i = 0; i < str.length; ++i) {
      if (str[i] === s) {
        count++;
      }
    }
    return count;
  };
  const judgeStr = (str: string, targetStr: string) =>
    str.length === targetStr.length
    && Array.from(str).every((s) => targetStr.includes(s) && getCount(s, targetStr) === getCount(s, str));

  const map = new Map<string, number>();
  return strs.reduce((acc, cur, index) => {
    let flag = false;
    if (map.has(cur)) {
      flag = true;
      acc[map.get(cur)!].push(cur);
    } else {
      map.set(cur, acc.length);
    }
    map.forEach((value, key) => {
      if (judgeStr(key, cur) && !flag && key !== cur) {
        flag = true;
        if (acc[value]) {
          acc[value].push(cur);
        }
        map.set(cur, value);
      }
    });

    if (!flag) {
      acc.push([cur]);
    }
    return acc;
  }, [] as string[][]);
}

export function lengthOfLastWord(s: string): number {
  if ((s.length === 0) || (s.length === 1 && s[0] === ' ')) {
    return 0;
  }
  if (s.length === 1) {
    return 1;
  }

  let start = 0;
  let end = 0;
  for (let i = s.length - 1; i >= 0; --i) {
    if (s[i] === ' ' && end === 0) {
      continue;
    }

    if (end === 0) {
      end = i;
    }

    if (end !== 0 && s[i] === ' ') {
      start = i + 1;
      break;
    }
  }
  return end - start + 1;
}

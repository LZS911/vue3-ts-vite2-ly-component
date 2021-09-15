/* eslint-disable indent */
/* eslint-disable prefer-const */
import { $ } from '../..';
import {
  digitalRoot, multiply, objToTree, addTwoNumbers, ListNode,
  add, judgePalindrome, myAtoi, convert, isMatch, indexAll, maxArea, isSpecial, getNumberArr, intToRoman,
  inToRoman2, longestCommonPrefix, generateArr, removeArr, getArrByAdd, threeSum, getOppositeNumber,
  threeSumClosest, letterCombinations, flatArray, fourSum, isValid, mergeTwoLists, generateParenthesis,
  removeDuplicates, removeElement, quickSort,
  strStr, findSubstring, nextPermutation, isToeplitzMatrix, numJewelsInStones,
  kthGrammar, Find, searchRange, searchInsert, searchInsertRecursion,
  checkVersion, isValidSudoku, countAndSay, groupBy, transformArr, combinationSum,
  fullPermutation, combinationSum2, firstMissingPositive, getObjPath,
  permute, permuteUnique, rotateArr, groupAnagrams, judgeStr1, judgeStr33, lengthOfLastWord,
  generateMatrix, getPermutation, rotateRight, reverseList, mergerTwoArrOrderByToFlatArr
} from '..';
import { useState } from '../../hooks';
import _ from 'lodash';

describe('hooks.ts', () => {
  //#region
  //   test('number', () => {
  //     const [count, setCount] = useState(0);
  //     setCount($(count) + 1);
  //     expect($(count)).toEqual(1);
  //   });

  //   test('string', () => {
  //     const [str, setStr] = useState('');
  //     setStr(`${$(str)}abc`);
  //     expect($(str)).toEqual('abc');
  //   });

  //   test('object', () => {
  //     const [obj, setObj] = useState({});
  //     let tmp = { a: '1', b: '2' };
  //     setObj(tmp);
  //     expect($(obj)).toEqual(tmp);
  //     tmp = { a: '5', b: '9' };
  //     expect($(obj)).not.toEqual(tmp);
  //     expect($(obj)).toEqual({ a: '1', b: '2' });
  //   });
  // });

  // describe('codewars.ts', () => {
  //   test('multiply', () => {
  //     expect(multiply(1, 1)).toEqual(2);
  //   });

  //   test('digitalRoot', () => {
  //     expect(digitalRoot(2)).toEqual(2);
  //     expect(digitalRoot(16)).toEqual(7);
  //     expect(digitalRoot(456)).toEqual(6);
  //   });

  //   test('objToTree', () => {
  //     const arr = [
  //       { id: 1, name: '部门1', pid: 0 },
  //       { id: 2, name: '部门2', pid: 1 },
  //       { id: 3, name: '部门3', pid: 1 },
  //       { id: 4, name: '部门4', pid: 3 },
  //       { id: 5, name: '部门5', pid: 4 },
  //     ];
  //     const res = [
  //       {
  //         id: 1,
  //         name: '部门1',
  //         pid: 0,
  //         children: [
  //           {
  //             id: 2,
  //             name: '部门2',
  //             pid: 1,
  //             children: []
  //           },
  //           {
  //             id: 3,
  //             name: '部门3',
  //             pid: 1,
  //             children: [
  //               {
  //                 id: 4,
  //                 name: '部门4',
  //                 pid: 3,
  //                 children: [
  //                   {
  //                     id: 5,
  //                     name: '部门5',
  //                     pid: 4,
  //                     children: []
  //                   },
  //                 ]
  //               },
  //             ]
  //           }
  //         ]
  //       }
  //     ];
  //   });

  //   // test('addTwoNumbers', () => {
  //   //   const l1 = new ListNode();
  //   //   const l2 = new ListNode();
  //   //   expect(addTwoNumbers(l1, l2)).toBe([8, 9, 9, 9, 0, 0, 0, 1]);
  //   // });

  //   test('add', async () => {
  //     const res = await add(1, 2, 3);
  //     expect(res).toBe(6);
  //   });

  //   test('judgePalindrome', () => {
  //     expect(judgePalindrome('abc')).toBe(false);
  //     expect(judgePalindrome('abb')).toBe(false);
  //     expect(judgePalindrome('ac')).toBe(false);
  //     expect(judgePalindrome('abcd')).toBe(false);
  //     expect(judgePalindrome('a')).toBe(true);
  //     expect(judgePalindrome('aa')).toBe(true);
  //     expect(judgePalindrome('bb')).toBe(true);
  //     expect(judgePalindrome('abccba')).toBe(true);
  //     expect(judgePalindrome('abcdcba')).toBe(true);
  //   });
  // test('convert', () => {
  //   expect(convert('PAYPALISHIRING', 3)).toBe('PAHNAPLSIIGYIR');
  //   expect(convert('A', 1)).toBe('A');
  //   expect(convert('A', 2)).toBe('A');
  //   expect(convert('AB', 1)).toBe('AB');
  //   expect(convert('AB', 2)).toBe('AB');
  //   expect(convert('ABC', 2)).toBe('ACB');
  //   expect(convert('ABC', 3)).toBe('ABC');
  //   expect(convert('ABCD', 2)).toBe('ACBD');
  //   expect(convert('PAYPALISHIRING', 4)).toBe('PINALSIGYAHRPI');
  // });

  //   test('myAtoi', () => {
  //     expect(myAtoi('42')).toBe(42);
  //     expect(myAtoi('   42')).toBe(42);
  //     expect(myAtoi('   -42')).toBe(-42);
  //     expect(myAtoi('words and 987')).toBe(0);
  //     expect(myAtoi('4193 with words')).toBe(4193);
  //     expect(myAtoi('-91283472332')).toBe(-2147483648);
  //     expect(myAtoi('3.14159')).toBe(3);
  //     expect(myAtoi('-+12')).toBe(0);
  //     expect(myAtoi('+12')).toBe(12);
  //   });

  // test('isMatch', () => {
  //   expect(isMatch('', '')).toBe(false);
  //   expect(isMatch('123', '')).toBe(false);
  //   expect(isMatch('', '123')).toBe(false);
  //   expect(isMatch('123', '1234')).toBe(false);
  //   expect(isMatch('123', '12.')).toBe(true);
  //   expect(isMatch('123', '...')).toBe(true);
  //   expect(isMatch('1234', '...3')).toBe(false);
  //   expect(isMatch('1234', '1..4')).toBe(true);
  //   expect(isMatch('1134', '1*34')).toBe(true);
  // });

  // test('indexAll', () => {
  //   expect(indexAll('123', '.')).toEqual([]);
  //   expect(indexAll('123.435', '.')).toEqual([3]);
  //   expect(indexAll('.', '.')).toEqual([0]);
  //   expect(indexAll('1.3.4', '.')).toEqual([1, 3]);
  //   expect(indexAll('.1.3.4', '.')).toEqual([0, 2, 4]);
  //   expect(indexAll('.1.3.4....42.35.234.453', '.')).toEqual([0, 2, 4, 6, 7, 8, 9, 12, 15, 19]);
  //   expect(indexAll('....', '.')).toEqual([0, 1, 2, 3]);
  // });

  // test('maxArea', () => {
  //   expect(maxArea([])).toBe(0);
  //   expect(maxArea([1])).toBe(0);
  //   expect(maxArea([1, 0])).toBe(0);
  //   expect(maxArea([1, 1])).toBe(1);
  //   expect(maxArea([4, 3, 2, 1, 4])).toBe(16);
  //   expect(maxArea([1, 2, 1])).toBe(2);
  //   expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  // });

  // test('getNumberArr', () => {
  //   expect(getNumberArr(0)).toEqual([0]);
  //   expect(getNumberArr(1)).toEqual([1]);
  //   expect(getNumberArr(12)).toEqual([2, 1]);
  //   expect(getNumberArr(123)).toEqual([3, 2, 1]);
  //   expect(getNumberArr(1234)).toEqual([4, 3, 2, 1]);
  //   expect(getNumberArr(10)).toEqual([0, 1]);
  //   expect(getNumberArr(101)).toEqual([1, 0, 1]);
  //   expect(getNumberArr(1012)).toEqual([2, 1, 0, 1]);
  //   expect(getNumberArr(1000)).toEqual([0, 0, 0, 1]);
  //   expect(getNumberArr(10000)).toEqual([0, 0, 0, 0, 1]);
  //   expect(getNumberArr(-1)).toEqual([-1]);
  //   expect(getNumberArr(400)).toEqual([0, 0, 4]);
  //   expect(getNumberArr(9)).toEqual([9]);
  //   expect(getNumberArr(2)).toEqual([2]);
  //   expect(getNumberArr(40)).toEqual([0, 4]);
  // });
  // test('isSpecial', () => {
  //   expect(isSpecial(0)).toBe(false);
  //   expect(isSpecial(1)).toBe(false);
  //   expect(isSpecial(3)).toBe(false);
  //   expect(isSpecial(4)).toBe(true);
  //   expect(isSpecial(5)).toBe(false);
  //   expect(isSpecial(9)).toBe(true);
  //   expect(isSpecial(10)).toBe(false);
  //   expect(isSpecial(40)).toBe(true);
  //   expect(isSpecial(50)).toBe(false);
  //   expect(isSpecial(90)).toBe(true);
  //   expect(isSpecial(400)).toBe(true);
  //   expect(isSpecial(500)).toBe(false);
  //   expect(isSpecial(900)).toBe(true);
  // });
  // test('inToRoman2', () => {
  //   expect(inToRoman2(1)).toBe('I');
  //   expect(inToRoman2(2)).toBe('II');
  //   expect(inToRoman2(3)).toBe('III');
  //   expect(inToRoman2(4)).toBe('IV');
  //   expect(inToRoman2(40)).toBe('XL');
  //   expect(inToRoman2(400)).toBe('CD');
  //   expect(inToRoman2(5)).toBe('V');
  //   expect(inToRoman2(6)).toBe('VI');
  //   expect(inToRoman2(7)).toBe('VII');
  //   expect(inToRoman2(8)).toBe('VIII');
  //   expect(inToRoman2(9)).toBe('IX');
  //   expect(inToRoman2(10)).toBe('X');
  //   expect(inToRoman2(11)).toBe('XI');
  //   expect(inToRoman2(12)).toBe('XII');
  //   expect(inToRoman2(13)).toBe('XIII');
  //   expect(inToRoman2(14)).toBe('XIV');
  //   expect(inToRoman2(15)).toBe('XV');
  //   expect(inToRoman2(16)).toBe('XVI');
  //   expect(inToRoman2(60)).toBe('LX');
  //   expect(inToRoman2(61)).toBe('LXI');
  //   expect(inToRoman2(90)).toBe('XC');
  //   expect(inToRoman2(900)).toBe('CM');
  //   // expect(inToRoman2(10)).toBe('X');
  //   // expect(inToRoman2(20)).toBe('XX');
  //   // expect(inToRoman2(30)).toBe('XXX');
  // });
  // test('intToRoman', () => {
  //   expect(intToRoman(1)).toBe('I');
  //   expect(intToRoman(2)).toBe('II');
  //   expect(intToRoman(3)).toBe('III');
  //   expect(intToRoman(4)).toBe('IV');
  //   expect(intToRoman(40)).toBe('XL');
  //   expect(intToRoman(400)).toBe('CD');
  //   expect(intToRoman(5)).toBe('V');
  //   expect(intToRoman(6)).toBe('VI');
  //   expect(intToRoman(7)).toBe('VII');
  //   expect(intToRoman(8)).toBe('VIII');
  //   expect(intToRoman(9)).toBe('IX');
  //   expect(intToRoman(10)).toBe('X');
  //   expect(intToRoman(11)).toBe('XI');
  //   expect(intToRoman(12)).toBe('XII');
  //   expect(intToRoman(13)).toBe('XIII');
  //   expect(intToRoman(14)).toBe('XIV');
  //   expect(intToRoman(15)).toBe('XV');
  //   expect(intToRoman(16)).toBe('XVI');
  //   expect(intToRoman(60)).toBe('LX');
  //   expect(intToRoman(61)).toBe('LXI');
  //   expect(intToRoman(90)).toBe('XC');
  //   expect(intToRoman(900)).toBe('CM');
  //   // expect(inToRoman2(10)).toBe('X');
  //   // expect(inToRoman2(20)).toBe('XX');
  //   // expect(inToRoman2(30)).toBe('XXX');
  // });

  // test('longestCommonPrefix', () => {
  //   expect(longestCommonPrefix([])).toBe('');
  //   expect(longestCommonPrefix(['', 'ab'])).toBe('');
  //   expect(longestCommonPrefix(['abc', 'cd'])).toBe('');
  //   expect(longestCommonPrefix(['abc', 'acd'])).toBe('a');
  //   expect(longestCommonPrefix(['acdbc', 'acd'])).toBe('acd');
  //   expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
  //   expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
  //   expect(longestCommonPrefix(['cir', 'car'])).toBe('c');
  //   expect(longestCommonPrefix(['aaa', 'aa', 'aaa'])).toBe('aa');
  // });

  // test('generateArr', () => {
  //   expect(generateArr(['abc', 'dfg'])).toEqual(['ad', 'bf', 'cg']);
  //   expect(generateArr(['abc', 'cd'])).toEqual(['ac', 'bd', 'c ']);
  //   expect(generateArr(['aaa', 'aa', 'aaa'])).toEqual(['aaa', 'aaa', 'a a']);
  // });

  // test('threeSum', () => {
  //   expect(threeSum([])).toEqual([]);
  //   expect(threeSum([0])).toEqual([]);
  //   expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
  //   expect(threeSum([1, 2, 4])).toEqual([]);
  //   expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([[-1, 0, 1], [-1, -1, 2]]);
  // });

  // test('removeArr', () => {
  //   expect(removeArr([1, 2, 3, 4], 1)).toEqual([2, 3, 4]);
  //   expect(removeArr([1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4]);
  //   expect(removeArr([], 5)).toEqual([]);
  // });

  // test('getArrByAdd', () => {
  //   expect(getArrByAdd([1, 2, 3, 4], 3)).toEqual([1, 2]);
  //   expect(getArrByAdd([1, 2, 3, 4], 5)).toEqual([2, 3, 1, 4]);
  //   expect(getArrByAdd([1, 2, 3, 4, 5, 5], 6)).toEqual([2, 4, 1, 5]);

  //   expect(getArrByAdd([0, 1, 2, -1, -4], 1)).toEqual([0, 1, 2, -1]);
  //   expect(getArrByAdd([-1, 1, 2, -1, -4], 0)).toEqual([-1, 1]);
  // });

  // test('getOppositeNumber', () => {
  //   expect(getOppositeNumber(1)).toBe(-1);
  //   expect(getOppositeNumber(12)).toBe(-12);
  //   expect(getOppositeNumber(-2)).toBe(2);
  //   expect(getOppositeNumber(-12)).toBe(12);
  //   expect(getOppositeNumber(0)).toBe(0);
  // });
  // test('threeSumClosest', () => {
  //   expect(threeSumClosest([-1, 2, 1, -4], 1)).toBe(2);
  //   expect(threeSumClosest([1, 4, 3, -4, 2], 1)).toBe(1);
  //   expect(threeSumClosest([0, 0, 0, 1], 1)).toBe(1);
  //   expect(threeSumClosest([0, 0, 0], 1)).toBe(0);
  // });
  // it('letterCombinations', () => {
  //   expect(letterCombinations('')).toEqual([]);
  //   expect(letterCombinations('1')).toEqual([]);
  //   expect(letterCombinations('123')).toEqual([]);
  //   expect(letterCombinations('23')).toEqual(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
  //   expect(letterCombinations('234')).toEqual([
  //     'adg', 'adh', 'adi', 'aeg',
  //     'aeh', 'aei', 'afg', 'afh',
  //     'afi', 'bdg', 'bdh', 'bdi',
  //     'beg', 'beh', 'bei', 'bfg',
  //     'bfh', 'bfi', 'cdg', 'cdh',
  //     'cdi', 'ceg', 'ceh', 'cei',
  //     'cfg', 'cfh', 'cfi'
  //   ]);
  // });

  // it('flatArray', () => {
  //   expect(flatArray([[]])).toEqual([]);
  //   expect(flatArray([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
  //   expect(flatArray([[1, 2, 3]])).toEqual([1, 2, 3]);
  //   expect(flatArray([[[1], [2], [3]], [[4], [5], [6]]])).toEqual([1, 2, 3, 4, 5, 6]);
  //   expect(flatArray([[1, [[2]], [3]], [[4], [5], [6]]])).toEqual([1, 2, 3, 4, 5, 6]);
  // });
  // it('fourSum', () => {
  //   expect(fourSum([], 10)).toEqual([]);
  //   expect(fourSum([1, 2, 3, 4, 5], 10)).toEqual([[1, 2, 3, 4]]);
  //   expect(fourSum([1, 0, -1, 0, 0, -2, 2], 0)).toEqual([[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]);
  //   expect(fourSum([-3, -2, -1, 0, 0, 1, 2, 3], 0)).toEqual([[-3, -2, 2, 3], [-3, -1, 1, 3], [-3, 0, 0, 3], [-3, 0, 1, 2], [-2, -1, 0, 3], [-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]);
  // });
  // it('isValid', () => {
  //   expect(isValid('()')).toBe(true);
  //   expect(isValid('{}')).toBe(true);
  //   expect(isValid('[]')).toBe(true);
  //   expect(isValid('(){}[]')).toBe(true);
  //   expect(isValid('({[]})')).toBe(true);
  //   expect(isValid('(}')).toBe(false);
  //   expect(isValid('({]})')).toBe(false);
  //   expect(isValid('(){}[')).toBe(false);
  //   expect(isValid('(){}[]]')).toBe(false);
  // });
  // it('mergeTwoLists', () => {
  //   const l1: ListNode = {
  //     val: 1,
  //     next: {
  //       val: 2,
  //       next: {
  //         val: 3,
  //         next: null
  //       }
  //     }
  //   };
  //   const l2: ListNode = {
  //     val: 1,
  //     next: {
  //       val: 3,
  //       next: {
  //         val: 4,
  //         next: null
  //       }
  //     }
  //   };

  //   const l3: ListNode = {
  //     val: 1,
  //     next: {
  //       val: 1,
  //       next: {
  //         val: 2,
  //         next: {
  //           val: 3,
  //           next: {
  //             val: 3,
  //             next: {
  //               val: 4,
  //               next: null
  //             }
  //           }
  //         }
  //       }
  //     }
  //   };

  //   expect(mergeTwoLists(l1, l2)).toEqual(l3);
  // });
  // it('removeDuplicates', () => {
  //   // expect(removeDuplicates([])).toBe(0);
  //   // expect(removeDuplicates([1])).toBe(1);
  //   // expect(removeDuplicates([1, 2])).toBe(2);
  //   // expect(removeDuplicates([1, 1, 2, 2, 3])).toBe(3);
  //   // expect(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toBe(5);
  // });

  // it('removeElement', () => {
  //   expect(removeElement([], 1)).toBe(0);
  //   expect(removeElement([1, 2, 3], 1)).toBe(2);
  //   expect(removeElement([3, 2, 2, 3], 3)).toBe(2);
  //   expect(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)).toBe(5);
  // });

  // it('strStr', () => {
  //   expect(strStr('', '')).toBe(0);
  //   expect(strStr('', 'a')).toBe(-1);
  //   expect(strStr('a', '')).toBe(0);
  //   expect(strStr('abc', 'a')).toBe(0);
  //   expect(strStr('abc', 'd')).toBe(-1);
  //   expect(strStr('hello', 'll')).toBe(2);
  //   expect(strStr('hello', 'lll')).toBe(-1);
  //   expect(strStr('aaaaa', 'bba')).toBe(-1);
  // });
  // it('generateParenthesis', () => {
  //   expect(generateParenthesis(1)).toEqual(['()']);
  //   expect(generateParenthesis(3)).toEqual(['((()))', '(()())', '(())()', '()(())', '()()()']);
  // });
  // it('findSubstring', () => {
  //   // expect(findSubstring('', ['foo', 'bar'])).toEqual([]);
  //   // expect(findSubstring('13', [])).toEqual([]);
  //   // expect(findSubstring('barfoothefoobarman', ['foo', 'bar'])).toEqual([9, 0]);
  //   // expect(findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word'])).toEqual([]);
  //   // expect(findSubstring('barfoofoobarthefoobarman', ['bar', 'foo', 'the'])).toEqual([9, 6, 12]);
  //   // expect(findSubstring('foobarfoobar', ['foo', 'bar'])).toEqual([0, 6, 3]);
  //   // expect(findSubstring('pjzkrkevzztxductzzxmxsvwjkxpvukmfjywwetvfnujhweiybwvvsrfequzkhossmootkmyxgjgfordrpapjuunmqnxxdrqrfgkrsjqbszgiqlcfnrpjlcwdrvbumtotzylshdvccdmsqoadfrpsvnwpizlwszrtyclhgilklydbmfhuywotjmktnwrfvizvnmfvvqfiokkdprznnnjycttprkxpuykhmpchiksyucbmtabiqkisgbhxngmhezrrqvayfsxauampdpxtafniiwfvdufhtwajrbkxtjzqjnfocdhekumttuqwovfjrgulhekcpjszyynadxhnttgmnxkduqmmyhzfnjhducesctufqbumxbamalqudeibljgbspeotkgvddcwgxidaiqcvgwykhbysjzlzfbupkqunuqtraxrlptivshhbihtsigtpipguhbhctcvubnhqipncyxfjebdnjyetnlnvmuxhzsdahkrscewabejifmxombiamxvauuitoltyymsarqcuuoezcbqpdaprxmsrickwpgwpsoplhugbikbkotzrtqkscekkgwjycfnvwfgdzogjzjvpcvixnsqsxacfwndzvrwrycwxrcismdhqapoojegggkocyrdtkzmiekhxoppctytvphjynrhtcvxcobxbcjjivtfjiwmduhzjokkbctweqtigwfhzorjlkpuuliaipbtfldinyetoybvugevwvhhhweejogrghllsouipabfafcxnhukcbtmxzshoyyufjhzadhrelweszbfgwpkzlwxkogyogutscvuhcllphshivnoteztpxsaoaacgxyaztuixhunrowzljqfqrahosheukhahhbiaxqzfmmwcjxountkevsvpbzjnilwpoermxrtlfroqoclexxisrdhvfsindffslyekrzwzqkpeocilatftymodgztjgybtyheqgcpwogdcjlnlesefgvimwbxcbzvaibspdjnrpqtyeilkcspknyylbwndvkffmzuriilxagyerjptbgeqgebiaqnvdubrtxibhvakcyotkfonmseszhczapxdlauexehhaireihxsplgdgmxfvaevrbadbwjbdrkfbbjjkgcztkcbwagtcnrtqryuqixtzhaakjlurnumzyovawrcjiwabuwretmdamfkxrgqgcdgbrdbnugzecbgyxxdqmisaqcyjkqrntxqmdrczxbebemcblftxplafnyoxqimkhcykwamvdsxjezkpgdpvopddptdfbprjustquhlazkjfluxrzopqdstulybnqvyknrchbphcarknnhhovweaqawdyxsqsqahkepluypwrzjegqtdoxfgzdkydeoxvrfhxusrujnmjzqrrlxglcmkiykldbiasnhrjbjekystzilrwkzhontwmehrfsrzfaqrbbxncphbzuuxeteshyrveamjsfiaharkcqxefghgceeixkdgkuboupxnwhnfigpkwnqdvzlydpidcljmflbccarbiegsmweklwngvygbqpescpeichmfidgsjmkvkofvkuehsmkkbocgejoiqcnafvuokelwuqsgkyoekaroptuvekfvmtxtqshcwsztkrzwrpabqrrhnlerxjojemcxel',
  //   //   ['dhvf', 'sind', 'ffsl', 'yekr', 'zwzq', 'kpeo', 'cila', 'tfty', 'modg', 'ztjg', 'ybty', 'heqg', 'cpwo', 'gdcj', 'lnle', 'sefg', 'vimw', 'bxcb'])).toEqual([0, 6, 3]);
  // });
  // it('nextPermutation', () => {
  //   // const arr1 = [1, 2, 3, 1];
  //   // nextPermutation(arr1);
  //   // expect(arr1).toEqual([1, 3, 1, 2]);

  //   // const arr2 = [3, 2, 1];
  //   // nextPermutation(arr2);
  //   // expect(arr2).toEqual([1, 2, 3]);

  //   // const arr3 = [1, 1, 5];
  //   // nextPermutation(arr3);
  //   // expect(arr3).toEqual([1, 5, 1]);

  //   // const arr4 = [1, 4, 3, 5];
  //   // nextPermutation(arr4);
  //   // expect(arr4).toEqual([1, 4, 5, 3]);

  //   // const arr5 = [1, 0, 0, 0];
  //   // nextPermutation(arr5);
  //   // expect(arr5).toEqual([0, 0, 0, 1]);

  //   // let arr6 = [2, 3, 1];
  //   // nextPermutation(arr6);
  //   // expect(arr6).toEqual([3, 1, 2]);

  //   // let arr7 = [5, 4, 7, 5, 3, 2];
  //   // nextPermutation(arr7);
  //   // expect(arr7).toEqual([5, 5, 2, 3, 4, 7]);
  // });

  // it('isToeplitzMatrix', () => {
  //   const res = isToeplitzMatrix([[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]]);
  //   expect(res).toBe(true);
  // });

  // it('numJewelsInStones', () => {
  //   expect(numJewelsInStones('aA', 'aAAbbbb')).toBe(3);
  // });

  // it('kthGrammar', () => {
  //   // expect(kthGrammar(1, 1)).toBe(0);
  //   // expect(kthGrammar(2, 2)).toBe(1);
  //   // expect(kthGrammar(3, 3)).toBe(1);
  //   // expect(kthGrammar(30, 434991989)).toBe(0);
  // });

  // it('Find', () => {
  //   // expect(Find(7, [])).toBe(false);
  //   // expect(Find(7, [[1, 2, 8, 9], [2, 4, 9, 12], [4, 7, 10, 13], [6, 8, 11, 15]])).toBe(true);
  //   // expect(Find(0, [[1, 2, 8, 9], [2, 4, 9, 12], [4, 7, 10, 13], [6, 8, 11, 15]])).toBe(false);
  //   expect(Find(5, [[1, 2, 8, 9], [2, 4, 9, 12], [4, 7, 10, 13], [6, 8, 11, 15]])).toBe(false);
  // });

  // it('searchRange', () => {
  //   const invalid = [-1, -1];
  //   expect(searchRange([], 1)).toEqual(invalid);
  //   expect(searchRange([1], 1)).toEqual([0, 0]);
  //   expect(searchRange([2, 2], 2)).toEqual([0, 1]);
  //   expect(searchRange([2, 3], 1)).toEqual(invalid);
  //   expect(searchRange([2, 3], 2)).toEqual([0, 0]);
  //   expect(searchRange([3, 3, 3], 3)).toEqual([0, 2]);
  //   expect(searchRange([3, 3, 3, 3, 3, 3], 3)).toEqual([0, 5]);
  //   expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4]);
  //   expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual(invalid);
  // });

  // it('quickSort', () => {
  //   // const arr = [7, 34, 45, 13, 67, 87, 2, 3, 4, 5, 1, 4232, 43, 657, 869, 989, 45, 3423];
  //   const arr1 = [4, 43, 54, 6, 1, 3, 8, 0];
  //   quickSort(arr1);
  // });

  // it('searchInsert', () => {
  //   expect(searchInsert([], 1)).toBe(0);
  //   expect(searchInsert([1], 1)).toBe(0);
  //   expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
  //   expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
  //   expect(searchInsert([1, 3, 5, 6], 0)).toBe(0);
  //   expect(searchInsert([1, 3, 5, 6], 4)).toBe(2);
  //   expect(searchInsert([1, 3, 5, 6, 8], 7)).toBe(4);
  // });
  // it('searchInsertRecursion', () => {
  //   expect(searchInsert([], 1)).toBe(0);
  //   expect(searchInsertRecursion([1], 1)).toBe(0);
  //   expect(searchInsertRecursion([1, 3, 5, 6], 5)).toBe(2);
  //   expect(searchInsertRecursion([1, 3, 5, 6], 2)).toBe(1);
  //   expect(searchInsertRecursion([1, 3, 5, 6], 0)).toBe(0);
  //   expect(searchInsertRecursion([1, 3, 5, 6], 4)).toBe(2);
  //   expect(searchInsertRecursion([1, 3, 5, 6, 8], 7)).toBe(4);
  // });

  // it('checkVersion', () => {
  //   expect(checkVersion('福.d.', '5.3.0')).toBe('error');
  //   expect(checkVersion('4.d.', '5.3.0')).toBe('error');

  //   expect(checkVersion('4.3', '5.3.1')).toBe('error');

  //   expect(checkVersion('4.3.1', '5.3.1')).toBe('upgradeVersionTooHigh');
  //   expect(checkVersion('4.3.1', '4.5.1')).toBe('upgradeVersionTooHigh');
  //   expect(checkVersion('8.3.1', '22.5.1')).toBe('upgradeVersionTooHigh');
  //   expect(checkVersion('4.4.1', '4.5.1')).toBe('upgradeVersionTooHigh');

  //   expect(checkVersion('4.3.1', '3.3.1')).toBe('upgradeVersionTooLow');
  //   expect(checkVersion('4.3.1', '4.3.0')).toBe('upgradeVersionTooLow');
  //   expect(checkVersion('4.3.1', '4.1.0')).toBe('upgradeVersionTooLow');
  //   expect(checkVersion('6.3.1', '5.3.2')).toBe('upgradeVersionTooLow');

  //   expect(checkVersion('4.3.1', '4.3.2')).toBe('');
  //   expect(checkVersion('4.3.0', '4.3.2')).toBe('');
  //   expect(checkVersion('4.3.5', '4.3.17')).toBe('');
  // });

  // it('isValidSudoku', () => {
  //   // const board1 =
  //   //   [['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  //   //   ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  //   //   ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  //   //   ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  //   //   ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  //   //   ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  //   //   ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  //   //   ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  //   //   ['.', '.', '.', '.', '8', '.', '.', '7', '9']];

  //   // expect(isValidSudoku(board1)).toBeTruthy();

  //   // const board2 =
  //   //   [['8', '3', '.', '.', '7', '.', '.', '.', '.'],
  //   //   ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  //   //   ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  //   //   ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  //   //   ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  //   //   ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  //   //   ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  //   //   ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  //   //   ['.', '.', '.', '.', '8', '.', '.', '7', '9']];

  //   // expect(isValidSudoku(board2)).toBeFalsy();

  //   const board3 = [
  //     ['.', '.', '.', '.', '.', '.', '5', '.', '.'],
  //     ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  //     ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  //     ['9', '3', '.', '.', '2', '.', '4', '.', '.'],
  //     ['.', '.', '7', '.', '.', '.', '3', '.', '.'],
  //     ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  //     ['.', '.', '.', '3', '4', '.', '.', '.', '.'],
  //     ['.', '.', '.', '.', '.', '3', '.', '.', '.'],
  //     ['.', '.', '.', '.', '.', '5', '2', '.', '.']];

  //   expect(isValidSudoku(board3)).toBeFalsy();
  // });

  // it('groupBy', () => {
  //   //相邻的才分组
  //   expect(groupBy(['1', '2', '2', '1', '3'])).toEqual([['1'], ['2', '2'], ['1'], ['3']]);
  //   // expect(groupBy([1, 1, 2])).toEqual([[1, 1], [2]]);
  //   // expect(groupBy([1, 2, 1, 1])).toEqual([[1], [2], [1, 1]]);
  //   expect(groupBy(['1', '1', '1', '2', '2', '1']))
  //     .toEqual([['1', '1', '1'], ['2', '2'], ['1']]);
  //   // const objArr = [{ name: 'lzs', sex: '1' }, { name: 'ly', sex: '1' }, { name: 'he he', sex: '0' }];

  //   // expect(groupBy(objArr, 'sex')).toEqual([
  //   //   [{ name: 'lzs', sex: '1' }, { name: 'ly', sex: '1' }],
  //   //   [{ name: 'he he', sex: '0' }]
  //   // ]);
  // });

  // it('transformArr', () => {
  //   expect(transformArr([['1']])).toEqual('11');
  //   expect(transformArr([['1', '1']])).toEqual('21');
  //   expect(transformArr([['2'], ['1']])).toEqual('1211');
  //   expect(transformArr([['1', '1'], ['2']])).toEqual('2112');
  // });

  // it('countAndSay', () => {
  //   // console.log(countAndSay(1));
  //   // console.log(countAndSay(2));
  //   // console.log(countAndSay(3));
  //   // console.log(countAndSay(4));
  //   // console.log(countAndSay(5));
  //   // console.log(countAndSay(6));
  // });

  // it('combinationSum', () => {
  //   const res = combinationSum([2, 3, 6, 7], 7);
  // });

  // it('combinationSum2', () => {
  //   const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
  // });

  // it('fullPermutation', () => {
  //   fullPermutation([1, 2, 3, 4]);
  // });

  // it('firstMissingPositive', () => {
  //   expect(firstMissingPositive([1, 0, 5, 4, 7])).toBe(2);
  //   expect(firstMissingPositive([1])).toBe(2);
  //   expect(firstMissingPositive([1, 1])).toBe(2);
  //   expect(firstMissingPositive([2])).toBe(1);
  //   expect(firstMissingPositive([-5])).toBe(1);
  //   expect(firstMissingPositive([1, 2, 0])).toBe(3);
  //   expect(firstMissingPositive([3, 4, -1, 1])).toBe(2);
  //   expect(firstMissingPositive([7, 8, 9, 11, 12])).toBe(1);
  // });

  // it('getObjPath', () => {
  //   const obj = {
  //     a: { b: 1, c: 2 },
  //     f: { z: 1 },
  //     d: {
  //       e: 3,
  //       f: {
  //         g: 4,
  //         h: 5,
  //         l: 7
  //       },
  //     },
  //     i: {
  //       j: 6,
  //       k: {
  //         l: 7,
  //         m: 8,
  //       },
  //     },
  //   };
  //   const res = getObjPath(obj, { value: 7, key: 'l' });
  // });

  // it('permute', () => {
  //   expect(permute([1, 2, 3]));
  // });

  // it('permuteUnique', () => {
  //   // console.log(permuteUnique([1, 1, 2]));
  //   // console.log(permuteUnique([1, 2, 1]));
  //   // console.log(permuteUnique([1, 2, 3]));
  // });

  // it('rotateArr', () => {
  //   const matrix = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]];
  //   rotateArr(matrix);
  // });
  //#endregion

  // it('judgeStr', () => {
  //   expect(judgeStr1('eat', 'tea')).toBe(true);
  //   expect(judgeStr1('tan', 'ate')).toBe(false);
  //   expect(judgeStr1('ups', 'may')).toBe(false);
  //   expect(judgeStr1('', '')).toBe(true);
  // });

  // it('judgeStr33', () => {
  //   judgeStr33('tttti', 'ttitt');
  // });

  // it('groupAnagrams', () => {
  //   const strArr = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
  //   const res = groupAnagrams(strArr);
  //   console.log(res);

  //   console.log(groupAnagrams(['']));
  //   console.log(groupAnagrams(['a']));
  //   console.log(groupAnagrams(['', '', '']));

  //   console.log(groupAnagrams(
  //     ['ewe', 'oil', 'mac', 'mar', 'tog', 'won', 'rug', 'deb',
  //       'nix', 'mia', 'ply', 'ali', 'mat', 'pro', 'mom', 'leo',
  //       'len', 'tad', 'rob', 'pee', 'fix', 'hug', 'sis', 'bmw',
  //       'cue', 'ger', 'may', 'guy', 'amy', 'got', 'ups', 'tod',
  //       'hat', 'ida', 'imp', 'nov', 'caw', 'may', 'tom', 'doe',
  //       'oat', 'flu', 'eye', 'yep', 'hui', 'vow', 'kim', 'bib',
  //       'pin', 'ark', 'cot', 'rib', 'keg', 'wry']));
  //   console.log(groupAnagrams(['rag', 'orr', 'err', 'bad', 'foe',
  //     'ivy', 'tho', 'gem', 'len', 'cat', 'ron', 'ump', 'nev',
  //     'cam', 'pen', 'dis', 'rob', 'tex', 'sin', 'col', 'buy',
  //     'say', 'big', 'wed', 'eco', 'bet', 'fog', 'buy', 'san',
  //     'kid', 'lox', 'sen', 'ani', 'mac', 'eta', 'wis', 'pot',
  //     'sid', 'dot', 'ham', 'gay', 'oar', 'sid', 'had', 'paw',
  //     'sod', 'sop']
  //   ));
  // });

  // it('lengthOfLastWord', () => {
  //   expect(lengthOfLastWord(' ')).toBe(0);
  //   expect(lengthOfLastWord('a')).toBe(1);
  //   expect(lengthOfLastWord('a ')).toBe(1);
  //   expect(lengthOfLastWord(' a')).toBe(1);
  //   expect(lengthOfLastWord('a a ')).toBe(1);
  //   expect(lengthOfLastWord('aa ')).toBe(2);
  //   expect(lengthOfLastWord('Hello World')).toBe(5);
  //   expect(lengthOfLastWord('   fly me   to   the moon  ')).toBe(4);
  //   expect(lengthOfLastWord('luffy is still joyboy')).toBe(6);
  // });

  // it('generateMatrix', () => {
  //   // generateMatrix(2);
  //   // generateMatrix(3);
  //   // generateMatrix(4);
  //   // generateMatrix(5);
  //   generateMatrix(6);
  // });

  // it('getPermutation', () => {
  //   expect(getPermutation(3, 3)).toBe('213');
  //   expect(getPermutation(4, 9)).toBe('2314');
  //   expect(getPermutation(3, 1)).toBe('123');
  // });

  // it('rotateRight', () => {
  //   const head1: ListNode = {
  //     val: 1,
  //     next: {
  //       val: 2,
  //       next: {
  //         val: 3,
  //         next: {
  //           val: 4,
  //           next: {
  //             val: 5,
  //             next: null
  //           }
  //         }
  //       }
  //     }
  //   };

  //   const head2: ListNode = {
  //     val: 0,
  //     next: {
  //       val: 1,
  //       next: {
  //         val: 2,
  //         next: null
  //       }
  //     }
  //   };

  //   const head3: ListNode = {
  //     val: 1,
  //     next: {
  //       val: 2,
  //       next: {
  //         val: 3,
  //         next: null,
  //       }
  //     }
  //   };

  //   const head4: ListNode = {
  //     val: 1,
  //     next: null
  //   };

  //   // console.log(rotateRight(head3, 2000000000));

  //   // console.log(rotateRight(head2, 4));
  //   // console.log(rotateRight(head1, 2));
  //   // console.log(rotateRight(head1, 10));
  //   // console.log(rotateRight(head4, 99));
  // });

  // it('reverseList', () => {
  //   const head1: ListNode = {
  //     val: 1,
  //     next: {
  //       val: 2,
  //       next: null
  //     }
  //   };
  //   const head2: ListNode = {
  //     val: 1,
  //     next: {
  //       val: 2,
  //       next: {
  //         val: 3,
  //         next: null
  //       }
  //     }
  //   };

  //   const head3: ListNode = {
  //     val: 1,
  //     next: null
  //   };
  //   console.log(reverseList(head1), 'xixi');
  //   console.log(reverseList(head2), 'haha');
  //   console.log(reverseList(head3), 'haha');
  // });

  /**
   * 合并二维有序数组成一维有序数组，归并排序的思路
   *
   */
  it('合并二维有序数组成一维有序数组，归并排序的思路', () => {
    expect(mergerTwoArrOrderByToFlatArr([])).toEqual([]);
    expect(mergerTwoArrOrderByToFlatArr([[1]])).toEqual([1]);
    expect(mergerTwoArrOrderByToFlatArr([[1, 4], [2, 3]])).toEqual([1, 2, 3, 4]);
    expect(mergerTwoArrOrderByToFlatArr([[1, 4], [2, 3]], 'asc')).toEqual([1, 2, 3, 4]);
    expect(mergerTwoArrOrderByToFlatArr([[1, 4], [2, 3]], 'desc')).toEqual([4, 3, 2, 1]);
  });
});

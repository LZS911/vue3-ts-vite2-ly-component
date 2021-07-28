import { $ } from '..';
import {
  digitalRoot, multiply, objToTree, addTwoNumbers, ListNode,
  add, judgePalindrome, myAtoi, convert, isMatch, indexAll, maxArea, isSpecial, getNumberArr,
  intToRoman
} from '../codewars';
import { useState } from '../hooks';
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

  //#endregion

  // test('maxArea', () => {
  //   expect(maxArea([])).toBe(0);
  //   expect(maxArea([1])).toBe(0);
  //   expect(maxArea([1, 0])).toBe(0);
  //   expect(maxArea([1, 1])).toBe(1);
  //   expect(maxArea([4, 3, 2, 1, 4])).toBe(16);
  //   expect(maxArea([1, 2, 1])).toBe(2);
  //   expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  // });

  test('getNumberArr', () => {
    expect(getNumberArr(0)).toEqual([0]);
    expect(getNumberArr(1)).toEqual([1]);
    expect(getNumberArr(12)).toEqual([2, 1]);
    expect(getNumberArr(123)).toEqual([3, 2, 1]);
    expect(getNumberArr(1234)).toEqual([4, 3, 2, 1]);
    expect(getNumberArr(10)).toEqual([0, 1]);
    expect(getNumberArr(101)).toEqual([1, 0, 1]);
    expect(getNumberArr(1012)).toEqual([2, 1, 0, 1]);
    expect(getNumberArr(1000)).toEqual([0, 0, 0, 1]);
    expect(getNumberArr(10000)).toEqual([0, 0, 0, 0, 1]);
    expect(getNumberArr(-1)).toEqual([-1]);
    expect(getNumberArr(400)).toEqual([0, 0, 4]);
    expect(getNumberArr(9)).toEqual([9]);
    expect(getNumberArr(2)).toEqual([2]);
    expect(getNumberArr(40)).toEqual([0, 4]);
  });
  test('isSpecial', () => {
    expect(isSpecial(0)).toBe(false);
    expect(isSpecial(1)).toBe(false);
    expect(isSpecial(3)).toBe(false);
    expect(isSpecial(4)).toBe(true);
    expect(isSpecial(5)).toBe(false);
    expect(isSpecial(9)).toBe(true);
    expect(isSpecial(10)).toBe(false);
    expect(isSpecial(40)).toBe(true);
    expect(isSpecial(50)).toBe(false);
    expect(isSpecial(90)).toBe(true);
    expect(isSpecial(400)).toBe(true);
    expect(isSpecial(500)).toBe(false);
    expect(isSpecial(900)).toBe(true);
  });
  test('intToRoman', () => {
    expect(intToRoman(1)).toBe('I');
    expect(intToRoman(2)).toBe('II');
    expect(intToRoman(3)).toBe('III');
    expect(intToRoman(4)).toBe('IV');
    expect(intToRoman(40)).toBe('XL');
    expect(intToRoman(400)).toBe('CD');
    expect(intToRoman(5)).toBe('V');
    expect(intToRoman(6)).toBe('VI');
    expect(intToRoman(7)).toBe('VII');
    expect(intToRoman(8)).toBe('VIII');
    expect(intToRoman(9)).toBe('IX');
    expect(intToRoman(10)).toBe('X');
    expect(intToRoman(11)).toBe('XI');
    expect(intToRoman(12)).toBe('XII');
    expect(intToRoman(13)).toBe('XIII');
    expect(intToRoman(14)).toBe('XIV');
    expect(intToRoman(15)).toBe('XV');
    expect(intToRoman(16)).toBe('XVI');
    expect(intToRoman(60)).toBe('LX');
    expect(intToRoman(61)).toBe('LXI');
    expect(intToRoman(90)).toBe('XC');
    expect(intToRoman(900)).toBe('CM');
    // expect(intToRoman(10)).toBe('X');
    // expect(intToRoman(20)).toBe('XX');
    // expect(intToRoman(30)).toBe('XXX');
  });
});

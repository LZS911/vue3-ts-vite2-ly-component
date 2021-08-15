import { defaultProps } from '../../../components/ly-popper/hooks/index.data';
import {
  deconstruct, fulfill, getDeepObj, entityify, integer, element,
  property, collect, repeat, harvest, testObj, pubsub
} from '..';
import { isFunction, isString, isNumber, isBool } from '../..';

describe('how javascript works', () => {
  // it('deconstruct', () => {
  //   expect(deconstruct(1)).toEqual({});
  // });

  it('fulfill', () => {
    // expect(fulfill('hello {var}', { var: 'javascript' })).toBe('hello javascript');

    const template = '{greeting}, {my.place:upper}! :{';
    const container = {
      greeting: 'Hello',
      my: {
        insect: 'Butteliy',
        place: 'World'
      }
    };

    const encoder = {
      upper: (str: string) => str.toUpperCase(),
      '': (str: string) => str
    };
    // expect(fulfill(template, container, encoder)).toBe('Hello, WORLD! :{');

    // eslint-disable-next-line no-template-curly-in-string
    const tmp = '<div>Good Lucky {name.first} {name.last} won ${amount}.<div>';
    const obj = {
      name: {
        first: 'li',
        last: '<script src=https:/>/enemy.evil/pwn.js/>'
      },
      amount: 18
    };

    expect(fulfill(tmp, obj, entityify)).toBe('<div>Good Lucky li &lt;script src=https:/&gt:/enemy.evil/pwn.js/&gt: won $18.<div>');
  });

  it('getDeepObj', () => {
    const obj = {
      name: {
        first: 'li',
        last: '<script src=https:/>/enemy.evil/pwn.js/>'
      },
      amount: 18
    };
    expect(getDeepObj('a.b.c', { a: { b: { c: 1 } } })).toBe(1);
    expect(getDeepObj('amount', obj)).toBe(18);

    expect(isNumber(18)).toBeTruthy();
  });

  it('integer', () => {
    const fn = integer(0, 4);
    expect(fn()).toBe(0);
    expect(fn()).toBe(1);
    expect(fn()).toBe(2);
    expect(fn()).toBe(3);
    expect(fn()).toBe(undefined);
  });

  it('element', () => {
    const arr = [1, 2, 3, 33, 41, 323];
    const fn1 = integer(1, arr.length);
    const fn2 = element(arr, fn1);
    // expect(fn2()).toBe(1);
    expect(fn2()).toBe(2);
    expect(fn2()).toBe(3);
    expect(fn2()).toBe(33);
    expect(fn2()).toBe(41);
    expect(fn2()).toBe(323);
    expect(fn2()).toBe(undefined);
  });

  it('property', () => {
    const o = { name: 'ly', sex: 0, age: 23 };
    const fn = property(o);
    expect(fn()).toEqual(['name', 'ly']);
    expect(fn()).toEqual(['sex', 0]);
    expect(fn()).toEqual(['age', 23]);
    expect(fn()).toBe(undefined);
  });

  it('collect -- repeat -- generate number array', () => {
    const arr1: number[] = [];
    const fn = collect(integer(0, 4), arr1);
    fn();
    fn();
    fn();
    fn();
    expect(arr1).toEqual([0, 1, 2, 3]);
    const arr2: number[] = [];
    repeat(collect(integer(0, 4), arr2));
    expect(arr2).toEqual(arr1);

    expect(harvest(integer(0, 4))).toEqual(arr1);
    expect(harvest(integer(0, 4))).toEqual(arr2);
  });

  it('collect -- repeat -- generate array array', () => {
    const targetArr = [0, 22, 33, 44, 55];
    const arr: number[] = [];
    const fn = collect(element(targetArr), arr);
    fn();
    fn();
    fn();
    fn();
    fn();
    expect(arr).toEqual(targetArr);
    const arr2: number[] = [];
    repeat(collect(element(targetArr), arr2));
    expect(arr2).toEqual(targetArr);

    expect(harvest(element(targetArr))).toEqual(arr);
    expect(harvest(element(targetArr))).toEqual(arr2);
  });

  it('collect -- repeat - generate object array', () => {
    const o = { name: 'ly', sex: 0, age: 23 };
    const arr: any[][] = [];
    const fn = collect(property(o), arr);
    fn();
    expect(arr).toEqual([['name', 'ly']]);
    fn();
    expect(arr).toEqual([['name', 'ly'], ['sex', 0]]);
    fn();
    expect(arr).toEqual([['name', 'ly'], ['sex', 0], ['age', 23]]);

    const arr2: any[][] = [];
    repeat(collect(property(o), arr2));
    expect(arr2).toEqual(arr);

    expect(harvest(property(o))).toEqual(arr);
    expect(harvest(property(o))).toEqual(arr2);
  });

  it('this is a question', () => {
    // const testFn = testObj.fn;
    // testFn();
    // const { fnn, fnnN } = testObj.fn();
    // fnn();
    // fnnN();
  });

  it('pubsub', () => {
    const { subscribe, publish } = pubsub();
    subscribe((msg: string) =>
      // console.log(this.length);
      msg
    );

    expect(publish('发送消息...'));
  });
});

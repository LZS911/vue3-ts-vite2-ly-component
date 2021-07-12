import { $ } from '..';
import { digitalRoot, multiply } from '../codewars';
import { useState } from '../hooks';

describe('hooks.ts', () => {
  test('number', () => {
    const [count, setCount] = useState(0);
    setCount($(count) + 1);
    expect($(count)).toEqual(1);
  });

  test('string', () => {
    const [str, setStr] = useState('');
    setStr(`${$(str)}abc`);
    expect($(str)).toEqual('abc');
  });

  test('object', () => {
    const [obj, setObj] = useState({});
    let tmp = { a: '1', b: '2' };
    setObj(tmp);
    expect($(obj)).toEqual(tmp);
    tmp = { a: '5', b: '9' };
    expect($(obj)).not.toEqual(tmp);
    expect($(obj)).toEqual({ a: '1', b: '2' });
  });
});

describe('codewars.ts', () => {
  test('multiply', () => {
    expect(multiply(1, 1)).toEqual(2);
  });

  test('digitalRoot', () => {
    expect(digitalRoot(2)).toEqual(2);
    expect(digitalRoot(16)).toEqual(7);
    expect(digitalRoot(456)).toEqual(6);
  });
});

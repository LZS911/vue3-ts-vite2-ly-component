import { sum, objEqual, arrReturn, toThrow } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 1 + 2 not equal 4', () => {
  expect(sum(1, 2)).not.toBe(4);
});

test('equal obj', () => {
  expect(objEqual({ test: '321' })).toEqual({ test: '321', t: '123' });
});

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('undefined', () => {
  const u = undefined;
  expect(u).not.toBeNull();
  expect(u).not.toBeDefined();
  expect(u).toBeUndefined();
  expect(u).not.toBeTruthy();
  expect(u).toBeFalsy();
});

test('zero', () => {
  const u = 0;
  expect(u).not.toBeNull();
  expect(u).toBeDefined();
  expect(u).not.toBeUndefined();
  expect(u).not.toBeTruthy();
  expect(u).toBeFalsy();
});

test('number', () => {
  const value = sum(2, 2);

  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(4);
  expect(value).toBeLessThan(4.5);
  expect(value).toBeLessThanOrEqual(4);

  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('float', () => {
  const value = sum(0.1, 0.2);
  expect(value).toBeCloseTo(0.3);
});

test('these is no I in team', () => {
  expect('item').not.toMatch(/I/);
});

test('these is a stop in stopping ', () => {
  expect('stopping').toMatch(/stop/);
});

test('array has sort, but not has small', () => {
  expect(arrReturn()).toContain('sort');
  expect(arrReturn()).not.toContain('small');
});

test('throw error', () => {
  expect(() => toThrow()).toThrow();
  expect(() => toThrow()).toThrow(Error);
  expect(() => toThrow()).toThrow('this is a error!');
  expect(() => toThrow()).toThrow(/error/);
});

import { forEach } from './sum';

const callbackFn = jest.fn((x) => 42 + x);

forEach([1, 2], callbackFn);

const filterFn = jest.fn();
filterFn.mockRejectedValueOnce(true).mockReturnValueOnce(false);

const arr = [1, 2];

test('mock fn', () => {
  expect(callbackFn.mock.calls.length).toBe(2);
  expect(callbackFn.mock.calls[0][0]).toBe(1);
  expect(callbackFn.mock.calls[1][0]).toBe(2);
  expect(callbackFn.mock.results[0].value).toBe(43);

  expect(arr.filter(filterFn)).toEqual([1]);
});

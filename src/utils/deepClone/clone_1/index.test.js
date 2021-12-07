import deepClone from './index';

describe('deep clone 1.0', () => {
  test('base', () => {
    const data = { field1: 'string', field2: { field3: 123 } };
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.field1 = 'number';
    cloneData.field2 = { field3: 456 };
    expect(data).not.toEqual(cloneData);
  });
  test('function', () => {
    const data = { field1: 'string', field2: { field3() {} } };
    const cloneData = deepClone(data);
    expect(data).not.toEqual(cloneData);
    expect(cloneData).toEqual({ field1: 'string', field2: {} });
  });
  test('null and undefined', () => {
    const data = {
      field1: 'string',
      field2: { field3: null, field4: undefined }
    };
    const cloneData = deepClone(data);
    console.log(cloneData, '  ====>  cloneData');
    expect(cloneData).toEqual({ field1: 'string', field2: { field3: null } });
  });

  test('symbol', () => {
    const data = {
      field1: 'string',
      field2: Symbol('bar')
    };
    const cloneData = deepClone(data);
    expect(data).not.toEqual(cloneData);
    expect(cloneData).toEqual({ field1: 'string' });
  });
});

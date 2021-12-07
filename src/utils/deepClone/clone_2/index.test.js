import deepClone from './index';

describe('deep clone 2.0', () => {
  it('base', () => {
    const data = { field1: 'string', field2: 123, field3: { field4: 'number' } };
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.field1 = 'str';
    cloneData.field3.field4 = 'num';
    expect(data).not.toEqual(cloneData);
  });

  it('function', () => {
    const data = { field1: 'string', field2: 123, field3: { field4: () => {} } };
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.field3.field4 = 'function';
    console.log(cloneData, data);
    expect(data).not.toEqual(cloneData);
  });

  it('array', () => {
    const data = { field1: 'string', field2: 123, field3: { field4: [12, [3, 4]] } };
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.field3.field4 = [4, 5];
    expect(data).not.toEqual(cloneData);
  });

  it('null and undefined', () => {
    const data = { field1: 'string', field2: 123, field3: { field4: null, field5: undefined } };
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.field3.field4 = { bar: 'baz' };
    expect(data).not.toEqual(cloneData);
  });

  it('symbol', () => {
    const data = {
      field1: 'string',
      field2: Symbol('bar')
    };
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.field2 = Symbol('bar');
    expect(data).not.toEqual(cloneData);
  });
});

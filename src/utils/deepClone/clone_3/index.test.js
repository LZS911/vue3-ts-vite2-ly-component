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

  it('circular reference obj', () => {
    const data = { field1: 'string', field2: 123, field3: { field4: 'number' } };
    data.field5 = data;
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.field5 = {};
    expect(data).not.toEqual(cloneData);
  });

  it('circular reference array', () => {
    const data = [1, 2];
    data.push(data);
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData[3] = 12;
    expect(data).not.toEqual(cloneData);
  });

  it('circular reference map', () => {
    const data = new Map([[1, 'add']]);
    data.set(2, data);
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.set(2, 'delete');
    expect(data).not.toEqual(cloneData);
  });

  it('circular reference set', () => {
    const data = new Set([1, 2, 3]);
    data.add(data);
    const cloneData = deepClone(data);
    expect(data).toEqual(cloneData);
    cloneData.add([12]);
    expect(data).not.toEqual(cloneData);
  });
});

import { baseType, myTypeof, myInstanceof, valuePassed } from '..';

describe('base type', () => {
  it('should typeof return string equal', () => {
    const {
      nullTypeStr,
      undefinedTypeStr,
      booleanTypeStr,
      stringTypeStr,
      numberTypeStr,
      symbolTypeStr,
      bigIntTypeStr,
      objTypeStr,
      arrTypeStr,
      funTypeStr
    } = baseType();
    expect(nullTypeStr).toBe('object');
    expect(undefinedTypeStr).toBe('undefined');
    expect(booleanTypeStr).toBe('boolean');
    expect(booleanTypeStr).toBe(typeof false);
    expect(stringTypeStr).toBe('string');
    expect(numberTypeStr).toBe('number');
    expect(symbolTypeStr).toBe('symbol');
    expect(bigIntTypeStr).toBe('bigint');
    expect(objTypeStr).toBe('object');
    expect(arrTypeStr).toBe('object');
    expect(funTypeStr).toBe('function');
  });

  it('instanceof', () => {
    expect([] instanceof Array).toBeTruthy();
    expect([] instanceof Object).toBeTruthy();
    expect({} instanceof Array).toBeFalsy();
    expect({} instanceof Object).toBeTruthy();
    function Fn(): any { }
    const f = {};
    Object.setPrototypeOf(f, Fn.prototype);
    expect(f instanceof Fn).toBeTruthy();
    expect(f instanceof Object).toBeTruthy();
    const c = Object.create(f);
    expect(c instanceof Fn).toBeTruthy();
    const notO = Object.create(null);
    expect(notO instanceof Object).toBeFalsy();
  });
  it('myInstanceof', () => {
    expect(myInstanceof(123, Array)).toBeFalsy();
    expect(myInstanceof([], Array)).toBeTruthy();
    expect(myInstanceof([], Object)).toBeTruthy();
    expect(myInstanceof({}, Object)).toBeTruthy();
    expect(myInstanceof(new Date(), Object)).toBeTruthy();
    function Fn(): any { }
    const f = {};
    Object.setPrototypeOf(f, Fn.prototype);
    expect(myInstanceof(f, Fn)).toBeTruthy();
    expect(myInstanceof(f, Object)).toBeTruthy();
    const c = Object.create(f);
    expect(myInstanceof(c, Fn)).toBeTruthy();
    const notO = Object.create(null);
    expect(myInstanceof(notO, Object)).toBeFalsy();
  });

  it('myTypeof', () => {
    expect(myTypeof(0)).toBe('number');
    expect(myTypeof('0')).toBe('string');
    expect(myTypeof(null)).toBe('null');
    expect(myTypeof(undefined)).toBe('undefined');
    expect(myTypeof(Symbol(1))).toBe('symbol');
    expect(myTypeof(BigInt(1))).toBe('bigint');
    expect(myTypeof([])).toBe('array');
    expect(myTypeof({})).toBe('object');
    expect(myTypeof(() => { })).toBe('function');
  });

  it('valuePassed', () => {
    const name = 'ly';
    valuePassed(name);
    expect(name).toBe('ly');

    expect(!!null).toBe(!!undefined);
    expect(!!null).toBeFalsy();
    expect(!!undefined).toBeFalsy();
    expect(Number(null)).toBe(0);
    expect(Number(undefined)).toBe(NaN);
  });

  it('test', () => {
    const bar = { name: 'ly', sex: '1' };
    const foo = Object.create(bar);
    foo.age = 18;
    // console.log(Object.keys(foo));
    // for (const key in foo) {
    //   console.log(key);
    // }
  });
});

//  ========================================== typescript ==========================================
interface Eg1 {
  name: string;
  age: string;
}

type T1 = keyof Eg1; // 'age' | 'name'

class Eg2 {
  private name: string = '';

  public age: string = '';

  protected sex: string = '';
}

type T2 = keyof Eg2; // 'age' only get public property

interface Eg3 {
  name: string;
  age: number;
}
type T3 = Eg3['name']; // string
type T4 = Eg3['name' | 'age']; // string | number
type T5 = Eg3[keyof Eg3] // string | number

type T6 = Eg1 & Eg3;

/**
 * @example
 * type A1 = '1'
 */
type A1 = 'x' extends 'x' ? '1' : '2'

/**
 * @example
 * type A1 = '2'
 */
type A2 = 'x' | 'y' extends 'x' ? '1' : '2'

type P<T> = T extends 'x' ? '1' : '2'

/**
 * @example
 * type A1 = '1' | '2'
 */
type A3 = P<'x' | 'y'>;

/**
 * @example
 * type A1 = '2'
 */
type A4 = P<['x' | 'y']>

interface Par {
  name: string;
}

interface Chi extends Par {
  sex: string;
}

let a: Par = {
  name: 'ly'
};
const b: Chi = {
  name: 'lzs',
  sex: '1'
};

a = b;
// b = a; not

// type A = 1 | 2 | 3;
// type B = 2 | 3;
// let a: A;
// let b: B;

// // 不可赋值
// b = a;
// // 可以赋值
// a = b;

//interface 情况下, 类型多的为子类, 子类可以赋值给父类
//type 情况下, 类型多的为父类, 子类可以赋值给父类

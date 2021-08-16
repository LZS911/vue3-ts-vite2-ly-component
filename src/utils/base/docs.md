# JavaScript

## 1. 数据类型

1. `null`: 只包含一个值 `null`, `typeof === 'object'`
2. `undefined`: 只包含一个值 `undefined`, `typeof === 'undefined'`
3. `boolean`: 包含两个值, `true` 和 `false`, `typeof === 'boolean'`
4. `string`: 一串表示文本值的字符序列, `typeof === 'string'`
5. `number`: 整数或浮点数，还有一些特殊值（`-Infinity、+Infinity、NaN`）, `typeof === 'number'`
6. `symbol`: es6 新增, 一种实例是唯一且不可改变的数据类型, `typeof === 'symbol'`
7. `bigint`: es10 新增, 它提供了一种方法来表示大于 253 - 1 的整数。这原本是 `Javascript` 中可以用 `Number` 表示的最大数字。 `BigInt` 可以表示任意大的整数, `typeof === 'bigint'`

8. `object`: `Javascript`中最重要的一种类型, 除了常用的 `Object, Array、 Function` 等都属于特殊的对象, `typeof === 'object'(Function 的typeof为 'function')`

### typeof 存在的问题: 无法正确判断 数组 和 null 类型

#### 解决办法

1. `instanceof`

   - 使用方式: `A instanceof B`
   - 原理: 判断构造函数 B 的原型对象是否存在与 A 的原型链上
   - 栗子:

   ```javascript
   const a = [];
   a instanceof Array; // true
   a instanceof Object; // true
   const o = {};
   o instanceof Object; // true
   o instanceof Array; // false

   const Fn = () => {};
   const f = new Fn();
   f instanceof Fn(); // true
   f instanceof Object; // true
   const c = Object.create(f);
   c instanceof Fn(); //true
   const notO = Object.create(null);
   notO instanceof Object; //false
   ```

   - 缺点: 上述栗子中可以发现数组和函数类型的实例的原型链最终还是会指向到`Object`上的, 并且对于一些基本字面数据类型(`number, string`)是无法使用`instanceof`的.

2. 使用 `Object.prototype.toString()`构建自己判断类型的 `myTypeof`
   实现如下:

   ```typescript
   type MyTypeOfReturnT =
     | 'object'
     | 'function'
     | 'number'
     | 'string'
     | 'symbol'
     | 'bigint'
     | 'array'
     | 'undefined'
     | 'null'
     | 'unknown';

   export const myTypeof = (target: unknown): MyTypeOfReturnT => {
     const tmpStr = Object.prototype.toString.call(target);
     const tmpArr = tmpStr.split(' ');
     if (tmpArr.length !== 2) return 'unknown' as MyTypeOfReturnT;
     return tmpArr[1].substring(0, tmpArr[1].length - 1).toLocaleLowerCase() as MyTypeOfReturnT;
   };
   ```

实现原理很简单, 就是利用 `toString`方法得到一串包含类型信息的字符串后对字符串进行处理即可

这里留个疑问: 为什么需要使用 `Object`原型上的 `toString`方法呢?

## 2. 函数参数的值传递与引用传递

我们先看下面这段代码:

```javascript
let name = 'ly';
function setName(name) {
  name = 'gll';
}
setName(name);
console.log(name); //ly

const obj = { name: 'ly' };
function setObj(o) {
  o.name = 'gll';
}
setObj(obj);
console.log(obj); //{name:'gll'}
```

首先明确一点, `javascript` 中函数的参数传递都是值传递. 虽然当传递对象类型是, 对象属性的值会发生变化, 但其实这时也只是传递了一个参数的副本(同样指向堆区间的地址), 我们在函数中对对象的属性操作时, 实际上和外部变量指向的堆区间是相同的, 但这并不代表是引用传递, 看下面这段代码:

```javascript
const obj = { name: 'ly' };
function setObj(o) {
  o.name = 'gll';
  o = { sex: '1' };
}
setObj(obj);
console.log(obj); //{name:'gll'}
```

可见, 函数传递并不是变量的引用, 而是变量拷贝的副本, 当变量为原始类型时, 这个副本就是本身, 当变量是引用类型时, 这个副本是指向堆区内存的地址.

## 3. null 与 undefined 的区别

- null: 表示被赋值过的对象, 后面被刻意赋值为`null`, 故意表示为空, 不应有值.
- undefined: 表示'缺少值', 此处应该有值, 但此时还没有给起赋值.

相同点:

`!!null === !!undefined === false`

不同点:

`Number(null) === 0`

`Number(undefined)为NaN`

## 4. 深拷贝与浅拷贝

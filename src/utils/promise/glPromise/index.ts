type TGlPromiseStatus = 'pending' | 'fulfilled' | 'rejected'

interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): PromiseLike<TResult1 | TResult2>;
}
interface IGlPromise<T> {
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): GlPromise<TResult1 | TResult2>;
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): GlPromise<T | TResult>;
}

export default class GlPromise<T> implements IGlPromise<T> {
  /**
   * 构造函数
   * @param executor 初始化 Promise 时传入的 callback, 类型为 : (resolve, reject) => void
   */
  constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
    // 执行传入的callback, 将 resolve, reject作为参数执行
    executor(this.resolve, this.reject);
  }

  //状态
  private PromiseStatus: TGlPromiseStatus = 'pending';

  //最终结果
  private PromiseResult: T = undefined as any;

  /**
   * resolve函数,
   *  构造函数中的回调函数的第一个参数
   * 进行操作:
   * 0. 判断状态时候为  pending, 不为 pending 代表该 promise 已经有结果了, 无法更改状态, 直接 return
   * 1. 将 PromiseStatus 从 pending ===> fulfilled, 状态改变后, then中的成功回调才会执行
   * 2. 将参数赋值给 PromiseResult
   * @param: value: T
   * @returns: void
   **/
  private resolve = (value: T) => {
    if (this.PromiseStatus !== 'pending') return;
    this.PromiseResult = value;
    this.PromiseStatus = 'fulfilled';
    while (this.onfulfilledCallbacks.length) {
      this.onfulfilledCallbacks.shift()!(this.PromiseResult);
    }
  }

  /**
   * reject函数,
   * 构造函数中的回调函数的第二个参数
   * 进行操作:
   * 0. 判断状态时候为  pending, 不为 pending 代表该 promise 已经有结果了, 无法更改状态, 直接 return
   * 1. 将 PromiseStatus 从 pending ===> rejected, 状态改变后, catch中的成功回调才会执行
   * 2. 将参数赋值给 PromiseResult
   * @param reason:any
   * @returns void
   */
  private reject = (reason: any) => {
    if (this.PromiseStatus !== 'pending') return;
    this.PromiseResult = reason;
    this.PromiseStatus = 'rejected';
    while (this.onrejectedCallbacks.length) {
      this.onrejectedCallbacks.shift()!(this.PromiseResult);
    }
  }

  private onfulfilledCallbacks: Array<((value?: T) => void) | null> = [];

  private onrejectedCallbacks: Array<((value?: T) => void) | null> = [];

  /**
   * 核心: then 函数
   *
   */
  public then = <TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null) => new GlPromise<TResult1 | TResult2>((resolve, reject) => {
    const thenPromise = (cb: ((values: T) => PromiseLike<TResult1 | TResult2> | TResult1 | TResult2)) => {
      //模拟微任务
      setTimeout(() => {
        try {
          const val = cb(this.PromiseResult);
          if (val instanceof GlPromise) {
            val.then(resolve, reject);
          } else {
            this.resolve(val as any);
          }
        } catch (error) {
          this.reject(error);
        }
      });
    };

    if (this.PromiseStatus === 'fulfilled') {
      onfulfilled && thenPromise(onfulfilled);
    } else if (this.PromiseStatus === 'rejected') {
      onrejected && thenPromise(onrejected);
    } else if (this.PromiseStatus === 'pending') {
      onfulfilled && this.onfulfilledCallbacks.push(thenPromise.bind(this, onfulfilled));
      onrejected && this.onrejectedCallbacks.push(thenPromise.bind(this, onrejected));
    }
  })

  public catch = <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null) => this.then(null, onrejected)

  public static all = <T>(promises: Array<GlPromise<T>>) => {
    const result: T[] = [];
    let count = 0;
    return new GlPromise((resolve, reject) => {
      const addFn = (index: number, value: T) => {
        count++;
        result[index] = value;
        if (count === promises.length) resolve(result);
      };
      promises.forEach((promise, index) => {
        if (promise instanceof GlPromise) {
          promise.then((res) => addFn(index, res), (err) => reject(err));
        } else {
          addFn(index, promise as T);
        }
      });
    });
  }

  public static any = <T>(promises: Array<GlPromise<T>>) => {
    let count = 0;
    return new GlPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (promise instanceof GlPromise) {
          promise.then((res) => resolve(res), (err) => {
            count++;
            if (count === promises.length) reject('All promises were rejected');
          });
        } else {
          resolve(promise);
        }
      });
    });
  }

  public static race = <T>(promises: Array<GlPromise<T>>) => new GlPromise((resolve, reject) => {
    promises.forEach((promise) => {
      if (promise instanceof GlPromise) {
        promise.then((res) => resolve(res), (err) => reject(err));
      } else {
        resolve(promise);
      }
    });
  })

  public static allSettled = <T>(promises: Array<GlPromise<T>>) => {
    const result: Array<{
      value: T,
      status: 'rejected' | 'fulfilled'
    }> = [];
    let count = 0;

    return new GlPromise((resolve, reject) => {
      const addFn = (index: number, status: 'rejected' | 'fulfilled', value: T) => {
        result.push({
          value,
          status
        });
        count++;
        if (count === promises.length) resolve(result);
      };
      promises.forEach((promise, index) => {
        if (promise instanceof GlPromise) {
          promise.then((res) => addFn(index, 'fulfilled', res), (err) => addFn(index, 'rejected', err));
        } else {
          addFn(index, 'fulfilled', promise);
        }
      });
    });
  }
}

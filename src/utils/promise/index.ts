/* eslint-disable no-throw-literal */
import { isFunction, isArray } from '..';

/* eslint-disable prefer-promise-reject-errors */
export const promiseDemo = () => {
  const demo01 = () => {
    const p1 = new Promise((resolve, reject) => {
      resolve('success');
      reject('error');
    });

    return p1;
  };
  const demo02 = () => {
    const p1 = new Promise((resolve, reject) => {
      reject('error');
      resolve('success');
    });

    return p1;
  };
  const demo03 = () => {
    const p1 = new Promise((resolve, reject) => {
      throw ('catch');
    });

    return p1;
  };
  const demo04 = () => {
    new Promise<string>((resolve, reject) => {
      resolve('success then, demo04');
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log('he he');
    });
  };
  const demo05 = () => {
    new Promise<string>((resolve, reject) => {
      reject('error then, demo05');
    }).then((res) => {
      console.log('xi xi');
    }, (err) => {
      console.log(err);
    });
  };
  const demo06 = () => new Promise<string>((resolve, reject) => {
    reject('catch log error, demo07');
  }).catch((err) => {
    console.log(err);
  });
  const demo07 = () => new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve('delay resolve success, demo06');
    }, 2000);
  }).then((res) => console.log(res));

  const demo08 = () => new Promise<number>((resolve, reject) => {
    resolve(100);
  }).then((res) => new Promise((resolve, reject) => { reject(3 * res); })).then((res) => console.log(res, 'success'), (err) => console.log(err, 'err'));
  const demo09 = () => new Promise<number>((resolve, reject) => {
    reject(100);
  }).then(() => { },
    (err) => new Promise((resolve, reject) => { resolve(3 * err); })).then((res) => console.log(res, 'success'), (err) => console.log(err, 'err'));

  const demo10 = () => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => { resolve('slow promise all, demo10'); }, 2000);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => { reject('fast promise all, demo10'); }, 1000);
    });

    const arr = [p1, p2];
    return Promise.all(arr).then((res) => console.log(res)).catch((err) => console.log(err));
  };

  const demo11 = () => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => { resolve('slow promise race, demo11'); }, 2000);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => { reject('fast promise race, demo11'); }, 1000);
    });
    const arr = [p1, p2];
    return Promise.race(arr).then((res) => console.log(res)).catch((err) => console.log(err));
  };

  const demo12 = () => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => { resolve('slow promise allSettled, demo12'); }, 2000);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => { reject('fast promise allSettled, demo12'); }, 1000);
    });
    const arr = [p1, p2];
    return Promise.allSettled(arr).then((res) => console.log(res));
  };
  const demo13 = () => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => { resolve('slow gl promise all, demo13'); }, 2000);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => { resolve('fast gl promise all, demo13'); }, 1000);
    });

    const arr = [p1, p2];
    return Promise.all(arr).then((res) => console.log(res));
  };
  const demo14 = () => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => { resolve('slow gl promise race, demo14'); }, 2000);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => { resolve('fast gl promise race, demo14'); }, 1000);
    });

    const arr = [p1, p2];
    return Promise.race(arr).then((res) => console.log(res));
  };

  const demo15 = () => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => { reject('error gl promise any, demo14'); }, 2000);
    });
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => { reject('error gl promise any, demo14'); }, 1000);
    });
    const arr = [p1, p2];
    return Promise.any(arr).then((res) => console.log(res)).catch((err) => console.log(err));
  };
  return { demo01, demo02, demo03, demo04, demo05, demo06, demo07, demo08, demo09, demo10, demo11, demo12, demo13, demo14, demo15 };
};

type PromiseStateType = 'pending' | 'fulfilled' | 'rejected';

interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): PromiseLike<TResult1 | TResult2>;
}
interface IGlPromise<T> {
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): GlPromise<TResult1 | TResult2>;
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): GlPromise<T | TResult>;
}

type ExecutorType<T> = (resolve: (values: T) => void, reject: (reason: any) => void) => void

export class GlPromise<T> implements IGlPromise<T> {
  constructor(executor: ExecutorType<T>) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  private onFulfilledCallbacks: Array<((value?: T) => void) | null> = [];

  private onRejectedCallbacks: Array<((value?: T) => void) | null> = [];

  private PromiseResult: T = undefined as any as T;

  private PromiseState: PromiseStateType = 'pending';

  private resolve = (values: T) => {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'fulfilled';
    this.PromiseResult = values;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()!(this.PromiseResult);
    }
  }

  private reject = (reason: any) => {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'rejected';
    this.PromiseResult = reason;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()!(this.PromiseResult);
    }
  }

  public then = <TResult1 = T, TResult2 = never>(onFulfilled?: ((values: T) => PromiseLike<TResult1> | TResult1) | null, onRejected?: ((reason: any) => PromiseLike<TResult2> | TResult2) | null) => new GlPromise<TResult1 | TResult2>((resolve, reject) => {
    const resolvePromise = (cb: ((values: T) => PromiseLike<TResult1 | TResult2> | TResult1 | TResult2) | null) => {
      setTimeout(() => {
        try {
          if (isFunction(cb)) {
            const val = cb(this.PromiseResult);
            if (val instanceof GlPromise) {
              val.then(resolve, reject);
            } else {
              resolve(val as any);
            }
          }
        } catch (error) {
          reject(error);
        }
      });
    };
    if (isFunction(onFulfilled) && this.PromiseState === 'fulfilled') {
      resolvePromise(onFulfilled);
    } else if (isFunction(onRejected) && this.PromiseState === 'rejected') {
      resolvePromise(onRejected);
    } else if (this.PromiseState === 'pending') {
      isFunction(onFulfilled) && this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
      isFunction(onRejected) && this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
    }
  })

  public catch = <TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null) => this.then(null, onRejected)

  public static all = <T>(promises: Array<PromiseLike<T>>) => {
    const result: T[] = [];
    let count = 0;
    return new GlPromise((resolve, reject) => {
      const addData = (index: number, value: T) => {
        result[index] = value;
        count++;
        if (count === promises.length) {
          resolve(result);
        }
      };
      promises.forEach((promise, index) => {
        if (promise instanceof GlPromise) {
          promise.then((res) => {
            addData(index, res);
          }, (err) => {
            reject(err);
          });
        } else {
          addData(index, promise as any);
        }
      });
    });
  }

  public static any = <T>(promises: Array<PromiseLike<T>>) => new GlPromise((resolve, reject) => {
    let count = 0;
    promises.forEach((promise) => {
      if (promise instanceof GlPromise) {
        promise.then((res) => resolve(res), () => {
          count++;
          if (count === promises.length) {
            reject('All promises were rejected');
          }
        });
      } else {
        resolve(promise as any);
      }
    });
  })

  public static race = <T>(promises: Array<PromiseLike<T>>) => new GlPromise((resolve, reject) => {
    promises.forEach((promise) => {
      if (promise instanceof GlPromise) {
        promise.then((res) => resolve(res), (err) => reject(err));
      } else {
        resolve(promise);
      }
    });
  })

  public static allSettled = <T>(promises: Array<PromiseLike<T>>) => new GlPromise((resolve, reject) => {
    const result: Array<{ status: 'fulfilled' | 'rejected', value: T }> = [];
    let count = 0;

    const addData = (index: number, value: T, status: 'fulfilled' | 'rejected') => {
      result[index] = {
        status, value
      };
      count++;
      if (count === promises.length) resolve(result);
    };

    promises.forEach((promise, index) => {
      if (promise instanceof GlPromise) {
        promise.then((res) => addData(index, res, 'fulfilled'), (err) => addData(index, err, 'rejected'));
      } else {
        addData(index, promise as any, 'fulfilled');
      }
    });
  })
}

export const glPromiseDemo = () => {
  const demo01 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      resolve('success');
      reject('error');
    });

    return p1;
  };
  const demo02 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      reject('error');
      resolve('success');
    });

    return p1;
  };
  const demo03 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      throw ('catch');
    });

    return p1;
  };
  const demo04 = () => {
    new GlPromise<string>((resolve, reject) => {
      resolve('success then gl, demo04');
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log('he he');
    });
  };
  const demo05 = () => {
    new GlPromise<string>((resolve, reject) => {
      reject('error then gl, demo05');
    }).then((res) => {
      console.log('xi xi');
    }, (err) => {
      console.log(err);
    });
  };
  const demo06 = () => new GlPromise<string>((resolve, reject) => {
    reject('catch log error gl, demo07');
  }).catch((err) => {
    console.log(err);
  });
  const demo07 = () => new GlPromise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve('delay glPromise then, demo06');
    }, 2000);
  }).then((res) => console.log(res));

  const demo08 = () => new GlPromise<number>((resolve, reject) => {
    resolve(100);
  }).then((res) => new GlPromise((resolve, reject) => { reject(3 * res); })).then((res) => console.log(res, 'success'), (err) => console.log(err, 'err'));
  const demo09 = () => new GlPromise<number>((resolve, reject) => {
    reject(100);
  }).then(null,
    (err) => new GlPromise((resolve, reject) => { resolve(3 * err); })).then((res) => console.log(res, 'success'), (err) => console.log(err, 'err'));

  const demo10 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      setTimeout(() => { resolve('slow gl promise all, demo10'); }, 2000);
    });
    const p2 = new GlPromise((resolve, reject) => {
      setTimeout(() => { reject('fast gl promise all, demo10'); }, 1000);
    });

    const arr = [p1, p2];
    return GlPromise.all(arr).catch((err) => console.log(err));
  };
  const demo11 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      setTimeout(() => { resolve('slow gl promise race, demo11'); }, 2000);
    });
    const p2 = new GlPromise((resolve, reject) => {
      setTimeout(() => { reject('fast gl promise race, demo11'); }, 1000);
    });
    const arr = [p1, p2];
    return GlPromise.race(arr).catch((err) => console.log(err));
  };
  const demo12 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      setTimeout(() => { resolve('slow gl promise allSettled, demo12'); }, 1000);
    });
    const p2 = new GlPromise((resolve, reject) => {
      setTimeout(() => { reject('fast gl promise allSettled, demo12'); }, 2000);
    });
    const arr = [p1, p2];
    return GlPromise.allSettled(arr).then((res) => console.log(res)).catch((err) => console.log(err));
  };

  const demo13 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      setTimeout(() => { resolve('slow gl promise all, demo13'); }, 2000);
    });
    const p2 = new GlPromise((resolve, reject) => {
      setTimeout(() => { resolve('fast gl promise all, demo13'); }, 1000);
    });

    const arr = [p1, p2];
    return GlPromise.all(arr).then((res) => console.log(res));
  };
  const demo14 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      setTimeout(() => { resolve('slow gl promise race, demo14'); }, 2000);
    });
    const p2 = new GlPromise((resolve, reject) => {
      setTimeout(() => { resolve('fast gl promise race, demo14'); }, 1000);
    });

    const arr = [p1, p2];
    return GlPromise.race(arr).then((res) => console.log(res));
  };
  const demo15 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      setTimeout(() => { reject('error gl promise any, demo15'); }, 2000);
    });
    const p2 = new GlPromise((resolve, reject) => {
      setTimeout(() => { reject('error gl promise any, demo15'); }, 1000);
    });
    const arr = [p1, p2];
    return GlPromise.any(arr).catch((err) => console.log(err));
  };
  const demo16 = () => {
    const p1 = new GlPromise((resolve, reject) => {
      setTimeout(() => { reject('error gl promise any, demo16'); }, 2000);
    });
    const p2 = new GlPromise((resolve, reject) => {
      setTimeout(() => { resolve('success gl promise any, demo16'); }, 1000);
    });
    const arr = [p1, p2];
    return GlPromise.any(arr).then((res) => console.log(res));
  };
  return { demo01, demo02, demo03, demo04, demo05, demo06, demo07, demo08, demo09, demo10, demo11, demo12, demo13, demo14, demo15, demo16 };
};

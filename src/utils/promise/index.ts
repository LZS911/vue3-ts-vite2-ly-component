/* eslint-disable no-throw-literal */

import { isFunction } from '..';

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

  return { demo01, demo02, demo03, demo04, demo05, demo06, demo07 };
};

type PromiseStateType = 'pending' | 'fulfilled' | 'rejected';
interface IGlPromise<T> {
  then: (onFulfilled?: ((values?: T) => void) | null, onRejected?: ((reason?: T) => void) | null) => GlPromise<T>
  catch: (onRejected?: ((reason?: any) => void) | null) => void
}

type ExecutorType<T> = (resolve: (values?: T) => void, reject: (reason?: any) => void) => void

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

  public then = (onFulfilled?: ((values?: T) => void) | null, onRejected?: ((reason?: any) => void) | null) => {
    const thenPromise = new GlPromise<T>((resolve, reject) => {
      const resolvePromise = (cb: ((values?: T) => void) | null) => {
        try {
          if (isFunction(cb)) {
            const val = cb(this.PromiseResult);
            if (val === thenPromise) {
              throw Error('promise error!');
            }
            if (val instanceof GlPromise) {
              val.then(resolve, reject);
            } else {
              resolve(val);
            }
          }
        } catch (error) {
          reject(error);
        }
      };
    });

    if (isFunction(onFulfilled) && this.PromiseState === 'fulfilled') {
      onFulfilled(this.PromiseResult);
    } else if (isFunction(onRejected) && this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult);
    } else if (this.PromiseState === 'pending') {
      isFunction(onFulfilled) && this.onFulfilledCallbacks.push(onFulfilled.bind(this));
      isFunction(onRejected) && this.onRejectedCallbacks.push(onRejected.bind(this));
    }
    return thenPromise;
  }

  public catch = (onRejected?: ((value?: T) => void) | null) => {
    this.then(null, onRejected);
  }

  private PromiseResult: T | undefined = undefined;

  private PromiseState: PromiseStateType = 'pending';

  private resolve = (values?: T) => {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'fulfilled';
    this.PromiseResult = values;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()!(this.PromiseResult);
    }
  }

  private reject = (reason?: any) => {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'rejected';
    this.PromiseResult = reason;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()!(this.PromiseResult);
    }
  }
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
      console.log('why not execute????');
      resolve('delay glPromise then, demo06');
    }, 2000);
  }).then((res) => console.log(res));

  return { demo01, demo02, demo03, demo04, demo05, demo06, demo07 };
};

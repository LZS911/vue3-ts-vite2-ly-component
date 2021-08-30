import { allPromiseFinish, FieldError } from '..';

describe('utils', () => {
  it('allPromiseFinish', () => {
    const arr: Promise<FieldError>[] = [
      new Promise((resolve, reject) => {
        resolve({
          name: ['heh'],
          errors: ['errr'],
          warnings: ['waaa']
        });
      }),
      new Promise((resolve, reject) => {
        resolve({
          name: ['xix'],
          errors: ['er'],
          warnings: ['wa']
        });
      }),
      new Promise((resolve, reject) => {
        reject(new Error('123'));
      }),
    ];

    return allPromiseFinish(arr);
  });
});

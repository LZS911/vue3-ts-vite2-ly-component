import { defaultProps } from '../../../components/ly-popper/hooks/index.data';
import { deconstruct, fulfill, getDeepObj, entityify } from '..';
import { isFunction, isString, isNumber, isBool } from '../..';

describe('how javascript works', () => {
  // it('deconstruct', () => {
  //   expect(deconstruct(1)).toEqual({});
  // });

  it('fulfill', () => {
    // expect(fulfill('hello {var}', { var: 'javascript' })).toBe('hello javascript');

    const template = '{greeting}, {my.place:upper}! :{';
    const container = {
      greeting: 'Hello',
      my: {
        insect: 'Butteliy',
        place: 'World'
      }
    };

    const encoder = {
      upper: (str: string) => str.toUpperCase(),
      '': (str: string) => str
    };
    // expect(fulfill(template, container, encoder)).toBe('Hello, WORLD! :{');

    // eslint-disable-next-line no-template-curly-in-string
    const tmp = '<div>Good Lucky {name.first} {name.last} won ${amount}.<div>';
    const obj = {
      name: {
        first: 'li',
        last: '<script src=https:/>/enemy.evil/pwn.js/>'
      },
      amount: 18
    };

    expect(fulfill(tmp, obj, entityify)).toBe('<div>Good Lucky li &lt;script src=https:/&gt:/enemy.evil/pwn.js/&gt: won $18.<div>');
  });

  it('getDeepObj', () => {
    const obj = {
      name: {
        first: 'li',
        last: '<script src=https:/>/enemy.evil/pwn.js/>'
      },
      amount: 18
    };
    expect(getDeepObj('a.b.c', { a: { b: { c: 1 } } })).toBe(1);
    expect(getDeepObj('amount', obj)).toBe(18);

    expect(isNumber(18)).toBeTruthy();
  });
});

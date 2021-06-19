import { mount } from '@vue/test-utils';
import { formT1, formT2 } from './index';

const wrapperT1 = mount(formT1);
const wrapperT2 = mount(formT2);

describe('Form1.vue', () => {
  test('set input value', async () => {
    await wrapperT1.find('input').setValue('email@gg.com');
    expect(wrapperT1.find('input').element.value).toBe('email@gg.com');
  });

  test('trigger button emit value for parent', async () => {
    await wrapperT1.find('button').trigger('click');
    const emitted = wrapperT1.emitted<string>('submit')!;
    expect(emitted).toHaveLength(1);
    expect(emitted[0][0]).toBe('email@gg.com');
  });
});

describe('Form2.vue', () => {
  test('submit form', async () => {
    const email = 'email@gg.com';
    const description = 'Lorem ipsum dolor sit amet';
    const city = 'moscow';

    await wrapperT2.find('input[type=email]').setValue(email);
    await wrapperT2.find('textarea').setValue(description);
    await wrapperT2.find('select').setValue(city);
    await wrapperT2.find('input[type=checkbox]').setValue();
    await wrapperT2.find('input[type=radio][value=monthly]').setValue();

    await wrapperT2.find('form').trigger('submit.prevent');
    const emitted = wrapperT2.emitted<any>('submit')!;
    expect(emitted).toHaveLength(2);
    expect(emitted[0][0]).toStrictEqual({
      email,
      description,
      city,
      subscribe: true,
      interval: 'monthly'
    });
  });
});

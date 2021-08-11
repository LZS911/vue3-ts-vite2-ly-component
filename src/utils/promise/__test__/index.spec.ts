import { glPromiseDemo, promiseDemo } from '..';

// describe('promise', () => {
//   it('demo01', () => {
//     const { demo01 } = promiseDemo();
//     const p1 = demo01();
//     console.log(p1, 'demo01');
//   });
//   it('demo02', () => {
//     const { demo02 } = promiseDemo();
//     const p1 = demo02();
//     console.log(p1, 'demo02');
//   });
//   it('demo03', () => {
//     const { demo03 } = promiseDemo();
//     const p1 = demo03();
//     console.log(p1, 'demo03');
//   });
//   it('demo04', () => {
//     const { demo04 } = promiseDemo();
//     demo04();
//   });
//   it('demo05', () => {
//     const { demo05 } = promiseDemo();
//     demo05();
//   });
// it('demo06', () => {
//   const { demo07 } = promiseDemo();
//   demo07();
// });
// });

// describe('glPromise', () => {
//   it('demo01', () => {
//     const { demo01 } = glPromiseDemo();
//     const p1 = demo01();
//     console.log(p1, 'demo01');
//   });
//   it('demo02', () => {
//     const { demo02 } = glPromiseDemo();
//     const p1 = demo02();
//     console.log(p1, 'demo02');
//   });
//   it('demo03', () => {
//     const { demo03 } = glPromiseDemo();
//     const p1 = demo03();
//     console.log(p1, 'demo03');
//   });
//   it('demo04', () => {
//     const { demo04 } = glPromiseDemo();
//     demo04();
//   });
//   it('demo05', () => {
//     const { demo05 } = glPromiseDemo();
//     demo05();
//   });
// it('demo06', () => {
//   const { demo06 } = glPromiseDemo();
//   demo06();
// });
// });

describe('promise async', () => {
  // it('demo7', () => {
  //   const { demo07 } = promiseDemo();
  //   return demo07();
  // });
});

describe('gl promise async', () => {
  it('demo07', () => {
    const { demo07 } = glPromiseDemo();
    return demo07();
    // console.log('demo07 xi xi ha ha ');
  });
});

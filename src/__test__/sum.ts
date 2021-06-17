export function sum(a: number, b: number) {
  return a + b;
}

export function objEqual(obj: { test: string; t?: string }) {
  obj.t = '123';
  return obj;
}

export function arrReturn() {
  return ['sort', 'height', 'array'];
}

export function toThrow() {
  throw new Error('this is a error!');
}

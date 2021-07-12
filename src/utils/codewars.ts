export function multiply(a: number, b: number): number {
  return a + b;
}

export const digitalRoot = (n: number): number => {
  if (String(n).length === 1) {
    return n;
  }
  const sum = Array.from(String(n)).map((item) => Number(item)).reduce((item, current) => item + current);

  return digitalRoot(sum);
};

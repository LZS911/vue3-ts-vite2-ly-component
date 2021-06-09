export const ISizeCorrespondHeight = new Map<string, number>([
  ['mini', 30],
  ['small', 40],
  ['Medium', 50]
]);
export const TSizeCorrespondHeight = new Map<string, number>([
  ['mini', 300],
  ['small', 400],
  ['Medium', 500]
]);
export const defaultTableHeight = TSizeCorrespondHeight.get('mini')!;
export const defaultTableWidth = ISizeCorrespondHeight.get('mini')!;

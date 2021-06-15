class LyError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'LyError';
  }
}

export default (scope:string, m:string) => {
  throw new LyError(`[${scope}] ${m}`);
};

export function warn(scope: string, m: string) {
  console.warn(new LyError(`[${scope}] ${m}`));
}

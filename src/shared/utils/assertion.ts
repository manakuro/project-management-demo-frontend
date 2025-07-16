// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const isFunction = (value: any): value is Function =>
  typeof value === 'function';

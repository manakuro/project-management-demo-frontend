declare type Override<T1, T2> = Omit<T1, keyof T2> & T2;
declare type ValueOf<T> = T[keyof T];
declare type Writeable<T> = { -readonly [P in keyof T]-?: T[P] };
declare type ArgType<
  T extends (...args: any[]) => any,
  N extends number,
> = Parameters<T>[N];
declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
declare type ToString<T extends number> = `${T}`;

declare type ArrayType<T> = T extends Array<infer V> ? V : never;
declare type Edges<T> = ArrayType<NonNullable<NonNullable<T>['edges']>>;
declare type Nodes<T> = ArrayType<NonNullable<NonNullable<T>['nodes']>>;
declare type EdgesNode<T> = NonNullable<Edges<T>>['node'];
declare type PageInfo<T> = NonNullable<NonNullable<T>['pageInfo']>;
declare type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;

declare global {
  const __DEV__: boolean | undefined;
}
declare const _default: typeof globalThis & {
  __DEV__: typeof __DEV__;
};

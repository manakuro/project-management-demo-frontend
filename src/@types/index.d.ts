declare type Override<T1, T2> = Omit<T1, keyof T2> & T2
declare type ValueOf<T> = T[keyof T]
declare type Writeable<T> = { -readonly [P in keyof T]-?: T[P] }
declare type ArgType<
  T extends (...args: any[]) => any,
  N extends number,
> = Parameters<T>[N]
declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

declare type Override<T1, T2> = Omit<T1, keyof T2> & T2
declare type ValueOf<T> = T[keyof T]
type Writeable<T> = { -readonly [P in keyof T]-?: T[P] }

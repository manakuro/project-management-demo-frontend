import { PropsWithChildren, FC } from 'react'

declare module 'react' {
  export type FCWithChildren<T = unknown> = FC<PropsWithChildren<T>>
}

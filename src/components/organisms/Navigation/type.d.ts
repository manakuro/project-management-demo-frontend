import { Pathname, Routes } from 'src/router'
import { IconType } from 'src/components/atoms'

export type NavListItem = {
  name: string
  icon: IconType
  pathname?: Pathname
} & (
  | {
      href: Routes
      isExternal?: false | undefined | null
    }
  | {
      href: string
      isExternal?: true
    }
)

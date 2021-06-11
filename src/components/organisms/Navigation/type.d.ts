import { NextRouter } from 'next/router'
import { Pathname, Routes } from 'src/router'
import { IconType } from 'src/shared/icons'

export type NavListItem = {
  name: string
  icon: IconType
  pathname?: Pathname
  isCurrentRoute?: (router: NextRouter) => boolean
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

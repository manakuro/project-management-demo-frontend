import { Pathname, Routes } from 'src/router'
import { IconType } from 'src/components/atoms'

export type NavListItem = {
  name: string
  href: Routes
  icon: IconType
  pathname: Pathname
}

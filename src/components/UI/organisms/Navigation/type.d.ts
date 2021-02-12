import { Pathname, Routes } from 'src/router'
import { IconType } from 'src/components/UI/atoms'

export type NavListItem = {
  name: string
  href: Routes
  icon: IconType
  pathname: Pathname
}

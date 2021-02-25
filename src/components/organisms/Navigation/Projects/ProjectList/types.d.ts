import { Routes } from 'src/router'
import { Colors } from 'src/modules/chakra'

export type Project = {
  name: string
  color: Colors
  href: Routes
}

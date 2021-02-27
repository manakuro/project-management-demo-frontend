import { Routes } from 'src/router'
import { Colors } from 'src/shared/chakra'

export type Project = {
  name: string
  color: Colors
  href: Routes
}

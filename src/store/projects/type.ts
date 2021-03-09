import { Colors } from 'src/shared/chakra'

export type Project = {
  id: string
  name: string
  color: {
    id: string
    name: string
    color: Colors
  }
  icon: {
    id: string
  }
}

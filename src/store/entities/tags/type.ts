import { Colors } from 'src/shared/chakra'

export type Tag = {
  id: string
  name: string
  taskId: string
  color: {
    id: string
    name: string
    color: Colors
  }
  createdAt: string
  updatedAt: string
}

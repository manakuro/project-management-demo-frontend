import { Colors } from 'src/shared/chakra'

export type ProjectResponse = {
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
  teammates: {
    id: string
    name: string
    image: string
    email: string
  }[]
}

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
  teammates: {
    id: string
    name: string
    image: string
    email: string
  }[]
  teammateIds: string[]
}

import { Colors } from 'src/shared/chakra'
import { ProjectTeammateResponse } from 'src/store/entities/projectTeammates'

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
  teammates: ProjectTeammateResponse[]
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
}

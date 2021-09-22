import { Colors } from 'src/shared/chakra'
import { ProjectsTeammateResponse } from 'src/store/entities/projectsTeammates'

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
  teammates: ProjectsTeammateResponse[]
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

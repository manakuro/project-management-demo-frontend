import { Teammate } from 'src/store/entities/teammates'

export type ProjectsTeammateResponse = Omit<
  Teammate,
  'createAt' | 'updatedAt'
> & {
  id: string
  teammateId: string
  projectId: string
  createdAt: string
  updatedAt: string
}

export type ProjectTeammate = {
  id: string
  teammateId: string
  projectId: string
  createdAt: string
  updatedAt: string
}

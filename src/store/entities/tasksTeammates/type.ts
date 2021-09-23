import { Teammate } from 'src/store/entities/teammates'

export type TasksTeammateResponse = Omit<Teammate, 'createAt' | 'updatedAt'> & {
  id: string
  teammateId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

export type TasksTeammate = {
  id: string
  teammateId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

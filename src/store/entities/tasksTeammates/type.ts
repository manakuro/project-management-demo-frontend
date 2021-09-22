import { Teammate } from 'src/store/entities/teammates'

export type TasksTeammateResponse = Teammate & {
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

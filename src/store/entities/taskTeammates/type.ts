import { Teammate } from 'src/store/entities/teammates'

export type TaskTeammateResponse = Teammate & {
  id: string
  teammateId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

export type TaskTeammate = {
  id: string
  teammateId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

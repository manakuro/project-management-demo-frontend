import { Teammate } from 'src/store/entities/teammates'

export type WorkspaceTeammateResponse = Omit<
  Teammate,
  'createAt' | 'updatedAt'
> & {
  id: string
  teammateId: string
  workspaceId: string
  isOwner: boolean
  role: string
  createdAt: string
  updatedAt: string
}

export type WorkspaceTeammate = {
  id: string
  teammateId: string
  workspaceId: string
  isOwner: boolean
  role: string
  createdAt: string
  updatedAt: string
}

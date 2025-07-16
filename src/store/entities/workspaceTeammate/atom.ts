import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import type { WorkspaceTeammate } from './type'

const key = (str: string) => `src/store/entities/workspacesTeammate/${str}`

const initialState = (): WorkspaceTeammate => ({
  id: '',
  workspaceId: '',
  teammateId: '',
  isOwner: false,
  role: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: workspaceTeammateState,
  listState: workspaceTeammatesState,
  idsState: workspaceTeammateIdsState,
} = createState({ key, initialState })

export const teammateIdsByWorkspaceIdState = selectorFamily<string[], string>({
  key: 'teammateIdsByWorkspaceIdState',
  get:
    (workspaceId) =>
    ({ get }) => {
      const workspaces = get(workspaceTeammatesState)
      return workspaces
        .filter((t) => t.workspaceId === workspaceId)
        .map((p) => p.teammateId)
    },
})

export const workspaceTeammateIdsByWorkspaceIdState = selectorFamily<
  string[],
  string
>({
  key: 'workspaceTeammateIdsByWorkspaceIdState',
  get:
    (workspaceId) =>
    ({ get }) => {
      const workspaces = get(workspaceTeammatesState)
      return workspaces
        .filter((t) => t.workspaceId === workspaceId)
        .map((p) => p.id)
    },
})

export const workspaceTeammateIdsByWorkspaceIdSortedByOwnerState =
  selectorFamily<string[], string>({
    key: 'workspaceTeammateIdsByWorkspaceIdSortedByOwnerState',
    get:
      (workspaceId) =>
      ({ get }) => {
        const workspaces = get(workspaceTeammatesState)
        return workspaces
          .filter((t) => t.workspaceId === workspaceId)
          .sort((a, b) => {
            if (a.isOwner) return -1
            if (b.isOwner) return 1
            return 0
          })
          .map((p) => p.id)
      },
  })

export const workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState =
  selectorFamily<string[], string>({
    key: 'workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState',
    get:
      (workspaceId) =>
      ({ get }) => {
        const workspaces = get(workspaceTeammatesState)
        return workspaces
          .filter((t) => t.workspaceId === workspaceId)
          .sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : 1
          })
          .map((p) => p.id)
      },
  })

export const ownerWorkspaceTeammateByWorkspaceIdState = selectorFamily<
  WorkspaceTeammate,
  string
>({
  key: 'ownerWorkspaceTeammateByWorkspaceIdState',
  get:
    (workspaceId) =>
    ({ get }) => {
      const workspaces = get(workspaceTeammatesState)
      return (
        workspaces.filter(
          (t) => t.workspaceId === workspaceId && t.isOwner,
        )[0] ?? initialState()
      )
    },
})

export const workspaceTeammateByWorkspaceIdAndTeammateIdState = selectorFamily<
  WorkspaceTeammate,
  { workspaceId: string; teammateId: string }
>({
  key: 'workspaceTeammateByWorkspaceIdAndTeammateIdState',
  get:
    ({ workspaceId, teammateId }) =>
    ({ get }) => {
      const workspaces = get(workspaceTeammatesState)
      return (
        workspaces.find(
          (t) => t.workspaceId === workspaceId && t.teammateId === teammateId,
        ) ?? initialState()
      )
    },
})

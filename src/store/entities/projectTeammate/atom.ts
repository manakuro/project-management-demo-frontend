import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import type { ProjectTeammate } from './type'

const key = (str: string) => `src/store/entities/projectTeammate/${str}`

const initialState = (): ProjectTeammate => ({
  id: '',
  projectId: '',
  teammateId: '',
  isOwner: false,
  role: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: projectTeammateState,
  listState: projectTeammatesState,
  idsState: projectTeammateIdsState,
} = createState({ key, initialState })

export const teammateIdsByProjectIdState = selectorFamily<string[], string>({
  key: 'teammateIdsByProjectIdState',
  get:
    (projectId) =>
    ({ get }) => {
      const projects = get(projectTeammatesState)
      return projects
        .filter((t) => t.projectId === projectId)
        .map((p) => p.teammateId)
    },
})

export const projectTeammateIdsByProjectIdState = selectorFamily<
  string[],
  string
>({
  key: 'projectTeammateIdsByProjectIdState',
  get:
    (projectId) =>
    ({ get }) => {
      const projects = get(projectTeammatesState)
      return projects.filter((t) => t.projectId === projectId).map((p) => p.id)
    },
})

export const projectTeammateIdsByProjectIdSortedByOwnerState = selectorFamily<
  string[],
  string
>({
  key: 'projectTeammateIdsByProjectIdSortedByOwnerState',
  get:
    (projectId) =>
    ({ get }) => {
      const projects = get(projectTeammatesState)
      return projects
        .filter((t) => t.projectId === projectId)
        .sort((a, b) => {
          if (a.isOwner) return -1
          if (b.isOwner) return 1
          return 0
        })
        .map((p) => p.id)
    },
})

export const projectTeammateIdsByProjectIdSortedByCreatedAtState =
  selectorFamily<string[], string>({
    key: 'projectTeammateIdsByProjectIdSortedByCreatedAtState',
    get:
      (projectId) =>
      ({ get }) => {
        const projects = get(projectTeammatesState)
        return projects
          .filter((t) => t.projectId === projectId)
          .sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : 1
          })
          .map((p) => p.id)
      },
  })

export const ownerProjectTeammateByProjectIdState = selectorFamily<
  ProjectTeammate,
  string
>({
  key: 'ownerProjectTeammateByProjectIdState',
  get:
    (projectId) =>
    ({ get }) => {
      const projects = get(projectTeammatesState)
      return (
        projects.filter((t) => t.projectId === projectId && t.isOwner)[0] ??
        initialState()
      )
    },
})

export const projectTeammateByProjectIdAndTeammateIdState = selectorFamily<
  ProjectTeammate,
  { projectId: string; teammateId: string }
>({
  key: 'projectTeammateByProjectIdAndTeammateIdState',
  get:
    ({ projectId, teammateId }) =>
    ({ get }) => {
      const projects = get(projectTeammatesState)
      return (
        projects.find(
          (t) => t.projectId === projectId && t.teammateId === teammateId,
        ) ?? initialState()
      )
    },
})

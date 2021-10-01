import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { ProjectTeammate } from './type'

const key = (str: string) => `src/store/entities/projectsTeammates/${str}`

export const projectTeammateIdsState = atom<string[]>({
  key: key('projectTeammateIdsState'),
  default: [],
})
export const projectTeammatesState = atom<ProjectTeammate[]>({
  key: key('projectTeammatesState'),
  default: [],
})

const initialProjectTeammateState = (): ProjectTeammate => ({
  id: '',
  projectId: '',
  teammateId: '',
  isOwner: false,
  createdAt: '',
  updatedAt: '',
})

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
        initialProjectTeammateState()
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
        ) ?? initialProjectTeammateState()
      )
    },
})

const state = atomFamily<ProjectTeammate, string>({
  key: key('state'),
  default: initialProjectTeammateState(),
})

export const projectTeammateState = selectorFamily<ProjectTeammate, string>({
  key: key('projectTeammateState'),
  get:
    (projectTeammateId) =>
    ({ get }) =>
      get(state(projectTeammateId)),
  set:
    (projectTeammateId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(projectTeammateId))
        return
      }

      set(state(projectTeammateId), newVal)
      set(projectTeammatesState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) => {
          if (p.id === newVal.id) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        }),
      )

      if (
        get(projectTeammateIdsState).find(
          (projectTeammateId) => projectTeammateId === newVal.id,
        )
      )
        return
      set(projectTeammateIdsState, (prev) => [...prev, newVal.id])
    },
})

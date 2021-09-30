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
const projectTeammateState = atomFamily<ProjectTeammate, string>({
  key: key('projectTeammateState'),
  default: initialProjectTeammateState(),
})

export const teammateIdsByProjectIdSelector = selectorFamily<string[], string>({
  key: 'projectsTeammateIdsSelector',
  get:
    (projectId) =>
    ({ get }) => {
      const projects = get(projectTeammatesState)
      return projects
        .filter((t) => t.projectId === projectId)
        .map((p) => p.teammateId)
    },
})

export const ownerProjectTeammateByProjectIdSelector = selectorFamily<
  ProjectTeammate,
  string
>({
  key: 'ownerProjectTeammateByProjectIdSelector',
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

export const projectTeammateByProjectIdAndTeammateIdSelector = selectorFamily<
  ProjectTeammate,
  { projectId: string; teammateId: string }
>({
  key: 'projectTeammateByProjectIdAndTeammateIdSelector',
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

export const projectTeammateSelector = selectorFamily<ProjectTeammate, string>({
  key: key('projectTeammateSelector'),
  get:
    (projectTeammateId) =>
    ({ get }) =>
      get(projectTeammateState(projectTeammateId)),
  set:
    (projectTeammateId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(projectTeammateState(projectTeammateId))
        return
      }

      set(projectTeammateState(projectTeammateId), newVal)
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

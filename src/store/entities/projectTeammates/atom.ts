import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { ProjectTeammate } from './type'

const key = (str: string) => `src/store/entities/projectTeammates/${str}`

export const projectTeammateIdsState = atom<string[]>({
  key: key('projectTeammateIdsState'),
  default: [],
})
export const projectTeammatesState = atom<ProjectTeammate[]>({
  key: key('projectTeammatesState'),
  default: [],
})

const projectTeammateState = atomFamily<ProjectTeammate, string>({
  key: key('projectTeammateState'),
  default: {
    id: '',
    projectId: '',
    teammateId: '',
    createdAt: '',
    updatedAt: '',
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

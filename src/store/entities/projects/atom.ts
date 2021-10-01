import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Project } from './type'

const key = (str: string) => `src/store/entities/projects/${str}`

export const projectIdsState = atom<string[]>({
  key: key('projectIdsState'),
  default: [],
})
export const projectsState = atom<Project[]>({
  key: key('projectsState'),
  default: [],
})

const state = atomFamily<Project, string>({
  key: key('state'),
  default: {
    id: '',
    name: '',
    color: {
      id: '',
      name: '',
      color: '',
    },
    icon: {
      id: '',
    },
    dueDate: '',
  },
})

export const projectState = selectorFamily<Project, string>({
  key: key('projectState'),
  get:
    (projectId) =>
    ({ get }) =>
      get(state(projectId)),
  set:
    (projectId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(projectId))
        return
      }

      set(state(projectId), newVal)
      set(projectsState, (prev) =>
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

      if (get(projectIdsState).find((projectId) => projectId === newVal.id))
        return
      set(projectIdsState, (prev) => [...prev, newVal.id])
    },
})

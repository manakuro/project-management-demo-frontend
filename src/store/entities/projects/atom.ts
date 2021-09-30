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

const projectState = atomFamily<Project, string>({
  key: key('projectState'),
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

export const projectSelector = selectorFamily<Project, string>({
  key: key('projectSelector'),
  get:
    (projectId) =>
    ({ get }) =>
      get(projectState(projectId)),
  set:
    (projectId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(projectState(projectId))
        return
      }

      set(projectState(projectId), newVal)
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

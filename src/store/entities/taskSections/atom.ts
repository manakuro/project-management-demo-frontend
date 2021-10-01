import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskSection } from './type'

const key = (str: string) => `src/store/entities/taskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const taskSectionIdsState = atom<string[]>({
  key: key('taskSectionIdsState'),
  default: [],
})

export const taskSectionsState = atom<TaskSection[]>({
  key: key('taskSectionsState'),
  default: [],
})

export const initialTaskSectionStateValue = (): TaskSection => ({
  id: '',
  name: DEFAULT_TITLE_NAME,
  createdAt: '',
  updatedAt: '',
  isDeleted: false,
})
const state = atomFamily<TaskSection, string>({
  key: key('state'),
  default: initialTaskSectionStateValue(),
})

export const taskSectionState = selectorFamily<TaskSection, string>({
  key: key('taskSectionState'),
  get:
    (taskSectionId) =>
    ({ get }) =>
      get(state(taskSectionId)),
  set:
    (taskSectionId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(taskSectionId))
        return
      }

      set(state(taskSectionId), newVal)
      set(taskSectionsState, (prev) =>
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
        get(taskSectionIdsState).find(
          (taskSectionId) => taskSectionId === newVal.id,
        )
      )
        return

      set(taskSectionIdsState, (prev) => [...prev, newVal.id])
    },
})

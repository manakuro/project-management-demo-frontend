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

export const defaultTaskSectionStateValue = (): TaskSection => ({
  id: '',
  name: DEFAULT_TITLE_NAME,
  createdAt: '',
  updatedAt: '',
  isDeleted: false,
})
const taskSectionState = atomFamily<TaskSection, string>({
  key: key('taskSectionState'),
  default: defaultTaskSectionStateValue(),
})

export const taskSectionSelector = selectorFamily<TaskSection, string>({
  key: key('taskSectionSelector'),
  get:
    (taskSectionId) =>
    ({ get }) =>
      get(taskSectionState(taskSectionId)),
  set:
    (taskSectionId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(taskSectionState(taskSectionId))
        return
      }

      set(taskSectionState(taskSectionId), newVal)
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

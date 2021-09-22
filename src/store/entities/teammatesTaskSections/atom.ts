import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import {
  taskSectionSelector,
  TaskSection,
} from 'src/store/entities/taskSections'
import { TeammatesTaskSection } from './type'

const key = (str: string) => `src/store/entities/teammatesTaskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const teammatesTaskSectionsState = atom<TeammatesTaskSection[]>({
  key: key('teammatesTaskSectionsState'),
  default: [],
})

export const defaultTeammatesTaskSectionState = (): TeammatesTaskSection => ({
  id: '',
  taskSectionId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})

const teammatesTaskSectionState = atomFamily<TeammatesTaskSection, string>({
  key: key('teammatesTaskSectionState'),
  default: defaultTeammatesTaskSectionState(),
})

export const taskSectionIdsByTeammateIdSelector = selectorFamily<
  string[],
  string
>({
  key: key('taskSectionIdsByTeammateIdSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      const teammatesTaskSections = get(teammatesTaskSectionsState)
      return teammatesTaskSections
        .filter((t) => t.teammateId === teammateId)
        .map((p) => p.taskSectionId)
    },
})

export const taskSectionsByTeammateIdSelector = selectorFamily<
  TaskSection[],
  string
>({
  key: key('taskSectionsByTeammateIdSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      const teammatesTaskSections = get(teammatesTaskSectionsState)
      return teammatesTaskSections
        .filter((t) => t.teammateId === teammateId)
        .map((p) => get(taskSectionSelector(p.taskSectionId)))
    },
})

export const teammatesTaskSectionSelector = selectorFamily<
  TeammatesTaskSection,
  string
>({
  key: key('teammatesTaskSectionSelector'),
  get:
    (teammatesTaskSectionId) =>
    ({ get }) =>
      get(teammatesTaskSectionState(teammatesTaskSectionId)),
  set:
    (teammatesTaskSectionId) =>
    ({ set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(teammatesTaskSectionState(teammatesTaskSectionId))
        return
      }

      set(teammatesTaskSectionState(teammatesTaskSectionId), newVal)
      set(teammatesTaskSectionsState, (prev) =>
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
    },
})

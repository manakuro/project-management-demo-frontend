import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { taskSectionState, TaskSection } from 'src/store/entities/taskSections'
import { TeammatesTaskSection } from './type'

const key = (str: string) => `src/store/entities/teammatesTaskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const teammatesTaskSectionsState = atom<TeammatesTaskSection[]>({
  key: key('teammatesTaskSectionsState'),
  default: [],
})

export const initialTeammatesTaskSectionState = (): TeammatesTaskSection => ({
  id: '',
  taskSectionId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})

export const taskSectionIdsByTeammateIdState = selectorFamily<string[], string>(
  {
    key: key('taskSectionIdsByTeammateIdState'),
    get:
      (teammateId) =>
      ({ get }) => {
        const teammatesTaskSections = get(teammatesTaskSectionsState)
        return teammatesTaskSections
          .filter((t) => t.teammateId === teammateId)
          .map((p) => p.taskSectionId)
      },
  },
)

export const taskSectionsByTeammateIdState = selectorFamily<
  TaskSection[],
  string
>({
  key: key('taskSectionsByTeammateIdState'),
  get:
    (teammateId) =>
    ({ get }) => {
      const teammatesTaskSections = get(teammatesTaskSectionsState)
      return teammatesTaskSections
        .filter((t) => t.teammateId === teammateId)
        .map((p) => get(taskSectionState(p.taskSectionId)))
    },
})

const state = atomFamily<TeammatesTaskSection, string>({
  key: key('state'),
  default: initialTeammatesTaskSectionState(),
})
export const teammatesTaskSectionState = selectorFamily<
  TeammatesTaskSection,
  string
>({
  key: key('teammatesTaskSectionState'),
  get:
    (teammatesTaskSectionId) =>
    ({ get }) =>
      get(state(teammatesTaskSectionId)),
  set:
    (teammatesTaskSectionId) =>
    ({ set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(teammatesTaskSectionId))
        return
      }

      set(state(teammatesTaskSectionId), newVal)
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

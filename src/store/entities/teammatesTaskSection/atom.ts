import { selector, selectorFamily } from 'recoil'
import { teammateTaskByTaskIdState } from 'src/store/entities/teammateTask'
import { createState } from 'src/store/util'
import type { TeammateTaskSection } from './type'

const key = (str: string) => `src/store/entities/teammatesTaskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const initialState = (): TeammateTaskSection => ({
  id: '',
  name: '',
  teammateId: '',
  assigned: false,
  isNew: false,
  createdAt: '',
  updatedAt: '',
})
export const {
  state: teammatesTaskSectionState,
  listState: teammatesTaskSectionsState,
} = createState({ key, initialState })

export const taskSectionIdsByTeammateIdState = selectorFamily<string[], string>(
  {
    key: key('taskSectionIdsByTeammateIdState'),
    get:
      (teammateId) =>
      ({ get }) => {
        const teammatesTaskSections = get(teammatesTaskSectionsState)
        return teammatesTaskSections
          .filter((t) => t.teammateId === teammateId)
          .map((p) => p.id)
      },
  },
)

export const taskSectionsByTeammateIdState = selectorFamily<
  TeammateTaskSection[],
  string
>({
  key: key('taskSectionsByTeammateIdState'),
  get:
    (teammateId) =>
    ({ get }) => {
      const teammatesTaskSections = get(teammatesTaskSectionsState)
      return teammatesTaskSections.filter((t) => t.teammateId === teammateId)
    },
})

export const teammateTaskSectionByTaskIdState = selectorFamily<
  TeammateTaskSection,
  string
>({
  key: key('teammateTaskSectionByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const teammateTask = get(teammateTaskByTaskIdState(taskId))
      const teammatesTaskSections = get(teammatesTaskSectionsState)
      return (
        teammatesTaskSections.find(
          (t) => t.id === teammateTask.teammateTaskSectionId,
        ) || initialState()
      )
    },
})

export const assignedTeammateTaskSectionState = selector<TeammateTaskSection>({
  key: key('assignedTeammateTaskSectionState'),
  get: ({ get }) => {
    const teammatesTaskSections = get(teammatesTaskSectionsState)
    return teammatesTaskSections.find((t) => t.assigned) || initialState()
  },
})

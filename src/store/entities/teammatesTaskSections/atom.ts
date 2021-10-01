import { selectorFamily } from 'recoil'
import { taskSectionState, TaskSection } from 'src/store/entities/taskSections'
import { createState } from 'src/store/util'
import { TeammatesTaskSection } from './type'

const key = (str: string) => `src/store/entities/teammatesTaskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const initialState = (): TeammatesTaskSection => ({
  id: '',
  taskSectionId: '',
  teammateId: '',
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

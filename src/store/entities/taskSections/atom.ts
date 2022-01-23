import { createState } from 'src/store/util'
import { TaskSection } from './type'

const key = (str: string) => `src/store/entities/taskSections/${str}`

export const DEFAULT_TITLE_NAME = 'Untitled Section'

export const initialState = (): TaskSection => ({
  id: '',
  name: DEFAULT_TITLE_NAME,
  createdAt: '',
  updatedAt: '',
})
export const {
  state: taskSectionState,
  listState: taskSectionsState,
  idsState: taskSectionIdsState,
} = createState({ key, initialState })

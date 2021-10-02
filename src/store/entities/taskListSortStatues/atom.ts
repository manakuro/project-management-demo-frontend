import { createState } from 'src/store/util'
import { TaskListSortStatus } from './type'

const key = (str: string) => `src/store/entities/taskListSortStatues/${str}`

const initialState = (): TaskListSortStatus => ({
  id: '',
  name: '',
  statusType: 1,
  createdAt: '',
  updatedAt: '',
})

export const {
  state: taskListSortStatusState,
  listState: taskListSortStatusesState,
  idsState: taskListSortStatusIdsState,
} = createState({ key, initialState })

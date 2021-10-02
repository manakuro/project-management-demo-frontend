import { createState } from 'src/store/util'
import { TaskListCompletedStatus } from './type'

const key = (str: string) =>
  `src/store/entities/taskListCompletedStatues/${str}`

const initialState = (): TaskListCompletedStatus => ({
  id: '',
  name: '',
  statusType: 1,
  createdAt: '',
  updatedAt: '',
})

export const {
  state: taskListCompletedStatusState,
  listState: taskListCompletedStatusesState,
  idsState: taskListCompletedStatusIdsState,
} = createState({ key, initialState })

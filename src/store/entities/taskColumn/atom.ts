import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import {
  type TaskColumn,
  TaskColumnType,
  type TaskColumnTypeValue,
} from './type'

const key = (str: string) => `src/store/entities/taskColumn/${str}`

const initialState = (): TaskColumn => ({
  id: '',
  name: '',
  type: TaskColumnType.TaskName,
  createdAt: '',
  updatedAt: '',
})

export const {
  state: taskColumnState,
  listState: taskColumnsState,
  idsState: taskColumnIdsState,
} = createState({ key, initialState })

export const taskColumnByTypeState = selectorFamily<TaskColumn, TaskColumnType>(
  {
    key: key('taskColumnByTypeState'),
    get:
      (type: TaskColumnTypeValue) =>
      ({ get }) => {
        const taskColumns = get(taskColumnsState)
        return taskColumns.find((t) => t.type === type) || initialState()
      },
  },
)

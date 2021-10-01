import { selectorFamily } from 'recoil'
import { TaskColumnType } from 'src/store/entities/taskColumns/types'
import { createState } from 'src/store/util'
import { TaskColumn } from './type'

const key = (str: string) => `src/store/entities/taskColumns/${str}`

const initialState = (): TaskColumn => ({
  id: '',
  name: '',
  type: 1,
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
      (type: TaskColumnType) =>
      ({ get }) => {
        const taskColumns = get(taskColumnsState)
        return taskColumns.find((t) => t.type === type)!
      },
  },
)

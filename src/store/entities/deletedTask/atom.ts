import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { DeletedTask } from './type'
const key = (str: string) => `src/store/entities/deletedTask/${str}`

export const initialState = (): DeletedTask => ({
  id: '',
  taskId: '',
  workspaceId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: deletedTaskState,
  listState: deletedTasksState,
  idsState: deletedTaskIdsState,
} = createState({ key, initialState })

export const deletedTasksByTaskIdState = selectorFamily<DeletedTask[], string>({
  key: key('deletedTasksByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const deletedTasks = get(deletedTasksState)
      return deletedTasks.filter((t) => t.taskId === taskId)
    },
})

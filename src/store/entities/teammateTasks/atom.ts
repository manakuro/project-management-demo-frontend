import { selector } from 'recoil'
import { tasksState, Task } from 'src/store/entities/tasks'
import { createState } from 'src/store/util'
import { TeammateTask } from './type'
const key = (str: string) => `src/store/entities/teammateTasks/${str}`

export const initialState = (): TeammateTask => ({
  id: '',
  taskId: '',
  teammateId: '',
  teammateTaskSectionId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: teammateTaskState,
  listState: teammateTasksState,
  idsState: teammateTaskIdsState,
} = createState({ key, initialState })

export const tasksByTeammateIdState = selector<Task[]>({
  key: key('tasksByTeammateIdState'),
  get: ({ get }) => {
    const tasks = get(tasksState)
    const teammateTasks = get(teammateTasksState)
    const taskIds = teammateTasks.map((t) => t.taskId)

    return tasks.filter((t) => taskIds.includes(t.id))
  },
})
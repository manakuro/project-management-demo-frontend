import { selector, selectorFamily } from 'recoil'
import { tasksState, Task } from 'src/store/entities/task'
import { createState } from 'src/store/util'
import { TeammateTask } from './type'
const key = (str: string) => `src/store/entities/teammateTask/${str}`

export const initialState = (): TeammateTask => ({
  id: '',
  taskId: '',
  teammateId: '',
  teammateTaskSectionId: '',
  workspaceId: '',
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

export const taskIdsByTeammateTaskSectionIdState = selectorFamily<
  Task[],
  string
>({
  key: key('taskIdsByTeammateTaskSectionIdState'),
  get:
    (teammateTaskSectionId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      const teammateTasks = get(teammateTasksState)
      const taskIds = teammateTasks
        .filter((t) => t.teammateTaskSectionId === teammateTaskSectionId)
        .map((t) => t.taskId)

      return tasks.filter((t) => taskIds.includes(t.id))
    },
})

export const teammateTaskByTaskIdState = selectorFamily<TeammateTask, string>({
  key: key('teammateTaskByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const teammateTasks = get(teammateTasksState)
      return teammateTasks.find((t) => t.taskId === taskId) || initialState()
    },
})

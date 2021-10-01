import { selectorFamily } from 'recoil'
import { Task, taskState } from 'src/store/entities/tasks'
import { createState } from 'src/store/util'
import { ProjectTask } from './type'

const key = (str: string) => `src/store/entities/projectTasks/${str}`

export const initialState = (): ProjectTask => ({
  id: '',
  projectId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: projectTaskState,
  listState: projectTasksState,
  idsState: projectTaskIdsState,
} = createState({ key, initialState })

export const projectIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('projectIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks
        .filter((p) => p.taskId === taskId)
        .map((p) => p.projectId)
    },
})

export const tasksByProjectIdState = selectorFamily<Task[], string>({
  key: key('tasksByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      const taskIds = projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId)
      return taskIds.map((id) => get(taskState(id)))
    },
})

export const projectTaskIdsByProjectIdState = selectorFamily<string[], string>({
  key: key('projectTaskIdsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId)
    },
})

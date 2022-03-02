import { selectorFamily } from 'recoil'
import { Task, tasksState, taskState } from 'src/store/entities/task'
import { createState } from 'src/store/util'
import { ProjectTask } from './type'

const key = (str: string) => `src/store/entities/projectTask/${str}`

export const initialState = (): ProjectTask => ({
  id: '',
  projectId: '',
  projectTaskSectionId: '',
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

export const projectTaskByTaskIdState = selectorFamily<ProjectTask, string>({
  key: key('projectTaskByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks.find((p) => p.taskId === taskId) || initialState()
    },
})

export const projectTasksByProjectTaskSectionIdState = selectorFamily<
  ProjectTask[],
  string
>({
  key: key('projectTaskByProjectTaskSectionIdState'),
  get:
    (projectTaskSectionId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks.filter(
        (p) => p.projectTaskSectionId === projectTaskSectionId,
      )
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

export const tasksByProjectTaskSectionIdState = selectorFamily<
  Task[],
  { projectId: string; projectTaskSectionId: string }
>({
  key: key('tasksByProjectTaskSectionIdState'),
  get:
    ({ projectTaskSectionId, projectId }) =>
    ({ get }) => {
      const tasks = get(tasksState)
      const projectTasks = get(projectTasksState)
      const taskIds = projectTasks
        .filter(
          (p) =>
            p.projectTaskSectionId === projectTaskSectionId &&
            p.projectId === projectId,
        )
        .map((p) => p.taskId)

      return tasks.filter((t) => taskIds.includes(t.id))
    },
})

export const taskIdsByProjectIdState = selectorFamily<string[], string>({
  key: key('taskIdsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId)
    },
})

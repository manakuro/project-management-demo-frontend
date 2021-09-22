import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Task, taskSelector } from 'src/store/entities/tasks'
import { ProjectTask } from './type'

const key = (str: string) => `src/store/entities/projectTasks/${str}`

export const projectTasksState = atom<ProjectTask[]>({
  key: key('projectTasksState'),
  default: [],
})

export const initialProjectsTaskState = (): ProjectTask => ({
  id: '',
  projectId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
})

const projectTaskState = atomFamily<ProjectTask, string>({
  key: key('projectTaskState'),
  default: initialProjectsTaskState(),
})

export const projectIdsByTaskIdSelector = selectorFamily<string[], string>({
  key: key('projectIdsByTaskIdSelector'),
  get:
    (taskId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks
        .filter((p) => p.taskId === taskId)
        .map((p) => p.projectId)
    },
})

export const tasksByProjectIdSelector = selectorFamily<Task[], string>({
  key: key('tasksByProjectIdSelector'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      const taskIds = projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId)
      return taskIds.map((id) => get(taskSelector(id)))
    },
})

export const projectTaskIdsByProjectIdSelector = selectorFamily<
  string[],
  string
>({
  key: key('projectTaskIdsByProjectIdSelector'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId)
    },
})

export const projectTaskSelector = selectorFamily<ProjectTask, string>({
  key: key('projectTaskSelector'),
  get:
    (projectTaskId) =>
    ({ get }) =>
      get(projectTaskState(projectTaskId)),
  set:
    (projectTaskId) =>
    ({ set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(projectTaskState(projectTaskId))
        return
      }

      set(projectTaskState(projectTaskId), newVal)
      set(projectTasksState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) => {
          if (p.id === newVal.id) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        }),
      )
    },
})

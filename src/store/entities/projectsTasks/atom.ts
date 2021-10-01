import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Task, taskState } from 'src/store/entities/tasks'
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

const state = atomFamily<ProjectTask, string>({
  key: key('state'),
  default: initialProjectsTaskState(),
})

export const projectTaskState = selectorFamily<ProjectTask, string>({
  key: key('projectTaskState'),
  get:
    (projectTaskId) =>
    ({ get }) =>
      get(state(projectTaskId)),
  set:
    (projectTaskId) =>
    ({ set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(projectTaskId))
        return
      }

      set(state(projectTaskId), newVal)
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

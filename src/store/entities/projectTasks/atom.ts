import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { ProjectTask } from './type'

const key = (str: string) => `src/store/entities/projectTasks/${str}`

export const projectTaskIdsState = atom<string[]>({
  key: key('projectTaskIdsState'),
  default: [],
})
export const projectTasksState = atom<ProjectTask[]>({
  key: key('projectTasksState'),
  default: [],
})

const projectTaskState = atomFamily<ProjectTask, string>({
  key: key('projectTaskState'),
  default: {
    id: '',
    projectId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
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

export const projectTasksByTaskIdSelector = selectorFamily<
  ProjectTask[],
  string
>({
  key: key('projectTasksByTaskIdSelector'),
  get:
    (taskId: string) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState)
      return projectTasks.filter((p) => p.taskId === taskId)
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
    ({ get, set, reset }, newVal) => {
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

      if (
        get(projectTaskIdsState).find(
          (projectTaskId) => projectTaskId === newVal.id,
        )
      )
        return
      set(projectTaskIdsState, (prev) => [...prev, newVal.id])
    },
})

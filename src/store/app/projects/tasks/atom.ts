import { selectorFamily } from 'recoil'
import {
  tasksState,
  filterByDueDate,
  filterByTaskSectionId,
} from 'src/store/entities/tasks'
import {
  filterByNoProject,
  filterByProjectId,
  filterTasks,
  sortTasks,
} from '../filters'
import { isProjectsSortStatus } from '../taskListStatus'

const key = (str: string) => `src/store/app/projects/tasks/${str}`

export const taskIdsSelector = selectorFamily<string[], string>({
  key: key('taskIdsSelector'),
  get:
    (projectId) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByProjectId({ get, projectId })(tasks)
      tasks = sortTasks({ get })(tasks)
      tasks = filterTasks({ get })(tasks)

      switch (true) {
        case get(isProjectsSortStatus('dueDate')): {
          return tasks.filter((t) => !!t.dueDate).map((t) => t.id)
        }
        default: {
          return tasks.map((t) => t.id)
        }
      }
    },
})

export const taskIdsByTaskSectionIdSelector = selectorFamily<
  string[],
  { taskSectionId: string; projectId: string }
>({
  key: key('taskIdsByTaskSectionIdSelector'),
  get:
    ({ taskSectionId, projectId }) =>
    ({ get }) => {
      let tasks = get(tasksState)
      switch (true) {
        case get(isProjectsSortStatus('dueDate')): {
          tasks = filterByProjectId({ get, projectId })(tasks)
          tasks = filterByTaskSectionId(taskSectionId)(tasks)
          tasks = filterTasks({ get })(tasks)
          return tasks.filter((t) => !t.dueDate).map((t) => t.id)
        }
        default: {
          tasks = filterByProjectId({ get, projectId })(tasks)
          tasks = filterByTaskSectionId(taskSectionId)(tasks)
          tasks = sortTasks({ get })(tasks)
          tasks = filterTasks({ get })(tasks)
          return tasks.map((t) => t.id)
        }
      }
    },
})

export const taskIdsByDueDateSelector = selectorFamily<
  string[],
  { dueDate: string; projectId: string }
>({
  key: key('taskIdsByDueDateSelector'),
  get:
    ({ dueDate, projectId }) =>
    ({ get }) => {
      let tasks = get(tasksState)

      tasks = filterByProjectId({ get, projectId })(tasks)
      tasks = filterByDueDate(dueDate)(tasks)

      return tasks.map((t) => t.id)
    },
})

export const taskIdsByProjectIdSelector = selectorFamily<string[], string>({
  key: key('taskIdsByProjectIdSelector'),
  get:
    (projectId: string) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByProjectId({ get, projectId })(tasks)
      tasks = filterTasks({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

export const taskIdsWithNoProjectSelector = selectorFamily<string[], string>({
  key: key('taskIdsWithNoProjectSelector'),
  get:
    (projectId: string) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByProjectId({ get, projectId })(tasks)
      tasks = filterByNoProject({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

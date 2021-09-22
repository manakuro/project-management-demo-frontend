import { selectorFamily } from 'recoil'
import {
  filterByNoProject,
  filterByProjectTasks,
  filterTasks,
  sortTasks,
} from 'src/store/app/myTasks/filters'
import { isMyTaskSortStatus } from 'src/store/app/myTasks/taskListStatus'
import { isTabStatusForMyTasks } from 'src/store/entities/tabStatusForMyTasks'
import {
  tasksState,
  filterByTeammateId,
  filterByDueDate,
  filterByTaskSectionId,
} from 'src/store/entities/tasks'

const key = (str: string) => `src/store/app/myTasks/tasks/${str}`

export const taskIdsSelector = selectorFamily<string[], string>({
  key: key('taskIdsSelector'),
  get:
    (teammateId) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByTeammateId(teammateId)(tasks)
      tasks = sortTasks({ get })(tasks)
      tasks = filterTasks({ get })(tasks)

      switch (true) {
        case get(isTabStatusForMyTasks('list')) &&
          get(isMyTaskSortStatus('dueDate')): {
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
  { taskSectionId: string; teammateId: string }
>({
  key: key('taskIdsByTaskSectionIdSelector'),
  get:
    ({ taskSectionId, teammateId }) =>
    ({ get }) => {
      let tasks = get(tasksState)
      switch (true) {
        case get(isTabStatusForMyTasks('list')) &&
          get(isMyTaskSortStatus('dueDate')): {
          tasks = filterByTeammateId(teammateId)(tasks)
          tasks = filterByTaskSectionId(taskSectionId)(tasks)
          tasks = filterTasks({ get })(tasks)
          return tasks.filter((t) => !t.dueDate).map((t) => t.id)
        }
        default: {
          tasks = filterByTeammateId(teammateId)(tasks)
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
  { dueDate: string; teammateId: string }
>({
  key: key('taskIdsByDueDateSelector'),
  get:
    ({ dueDate, teammateId }) =>
    ({ get }) => {
      let tasks = get(tasksState)

      tasks = filterByTeammateId(teammateId)(tasks)
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
      tasks = filterByProjectTasks({ get, projectId })(tasks)
      tasks = filterTasks({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

export const taskIdsWithNoProjectSelector = selectorFamily<string[], string>({
  key: key('taskIdsWithNoProjectSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByTeammateId(teammateId)(tasks)
      tasks = filterByNoProject({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

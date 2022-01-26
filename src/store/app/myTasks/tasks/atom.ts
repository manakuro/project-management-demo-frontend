import { selectorFamily } from 'recoil'
import {
  filterByNoProject,
  filterByProjectTasks,
  filterTasks,
  sortTasks,
} from 'src/store/app/myTasks/filters'
import { isTaskListSortStatusState } from 'src/store/app/myTasks/taskListStatus'
import {
  tasksState,
  filterByTeammateId,
  filterByDueDate,
  filterByTaskSectionId,
} from 'src/store/entities/tasks'
import { isTabStatusState } from 'src/store/entities/teammateTaskTabStatus'

const key = (str: string) => `src/store/app/myTasks/tasks/${str}`

export const taskIdsState = selectorFamily<string[], string>({
  key: key('taskIdsState'),
  get:
    (teammateId) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByTeammateId(teammateId)(tasks)
      tasks = sortTasks({ get })(tasks)
      tasks = filterTasks({ get })(tasks)

      switch (true) {
        case get(isTabStatusState('List')) &&
          get(isTaskListSortStatusState('dueDate')): {
          return tasks.filter((t) => !!t.dueDate).map((t) => t.id)
        }
        default: {
          return tasks.map((t) => t.id)
        }
      }
    },
})

export const taskIdsByTaskSectionIdState = selectorFamily<
  string[],
  { taskSectionId: string; teammateId: string }
>({
  key: key('taskIdsByTaskSectionIdState'),
  get:
    ({ taskSectionId, teammateId }) =>
    ({ get }) => {
      let tasks = get(tasksState)
      switch (true) {
        case get(isTabStatusState('List')) &&
          get(isTaskListSortStatusState('dueDate')): {
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

export const taskIdsByDueDateState = selectorFamily<
  string[],
  { dueDate: string; teammateId: string }
>({
  key: key('taskIdsByDueDateState'),
  get:
    ({ dueDate, teammateId }) =>
    ({ get }) => {
      let tasks = get(tasksState)

      tasks = filterByTeammateId(teammateId)(tasks)
      tasks = filterByDueDate(dueDate)(tasks)

      return tasks.map((t) => t.id)
    },
})

export const taskIdsByProjectIdState = selectorFamily<string[], string>({
  key: key('taskIdsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByProjectTasks({ get, projectId })(tasks)
      tasks = filterTasks({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

export const taskIdsWithNoProjectState = selectorFamily<string[], string>({
  key: key('taskIdsWithNoProjectState'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByTeammateId(teammateId)(tasks)
      tasks = filterByNoProject({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

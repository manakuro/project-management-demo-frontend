import { selectorFamily } from 'recoil'
import { tasksByProjectIdState } from 'src/store/entities/projectsTasks'
import {
  filterByDueDate,
  filterByTaskSectionId,
} from 'src/store/entities/tasks'
import { filterTasks, sortTasks } from '../filters'
import { isTaskListSortStatusState } from '../taskListStatus'

const key = (str: string) => `src/store/app/projects/tasks/${str}`

export const taskIdsState = selectorFamily<string[], string>({
  key: key('taskIdsState'),
  get:
    (projectId) =>
    ({ get }) => {
      let tasks = get(tasksByProjectIdState(projectId))
      tasks = sortTasks({ get })(tasks)
      tasks = filterTasks({ get })(tasks)

      switch (true) {
        case get(isTaskListSortStatusState('dueDate')): {
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
  { taskSectionId: string; projectId: string }
>({
  key: key('taskIdsByTaskSectionIdState'),
  get:
    ({ taskSectionId, projectId }) =>
    ({ get }) => {
      let tasks = get(tasksByProjectIdState(projectId))
      switch (true) {
        case get(isTaskListSortStatusState('dueDate')): {
          tasks = filterByTaskSectionId(taskSectionId)(tasks)
          tasks = filterTasks({ get })(tasks)
          return tasks.filter((t) => !t.dueDate).map((t) => t.id)
        }
        default: {
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
  { dueDate: string; projectId: string }
>({
  key: key('taskIdsByDueDateState'),
  get:
    ({ dueDate, projectId }) =>
    ({ get }) => {
      let tasks = get(tasksByProjectIdState(projectId))
      tasks = filterByDueDate(dueDate)(tasks)

      return tasks.map((t) => t.id)
    },
})

export const taskIdsByProjectIdState = selectorFamily<string[], string>({
  key: key('taskIdsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      let tasks = get(tasksByProjectIdState(projectId))
      tasks = filterTasks({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

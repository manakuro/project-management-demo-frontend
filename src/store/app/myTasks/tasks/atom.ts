import { selectorFamily, selector } from 'recoil'
import {
  filterByNoProject,
  filterByProjectTasks,
  filterTasks,
  sortTasks,
} from 'src/store/app/myTasks/filters'
import { isTaskListSortStatusState } from 'src/store/app/myTasks/taskListStatus'
import { filterByDueDate } from 'src/store/entities/task'
import {
  tasksByTeammateTaskSectionIdState,
  tasksByTeammateIdState,
} from 'src/store/entities/teammateTask'
import { isTabStatusState } from 'src/store/entities/teammateTaskTabStatus'

const key = (str: string) => `src/store/app/myTasks/tasks/${str}`

export const taskIdsState = selector<string[]>({
  key: key('taskIdsState'),
  get: ({ get }) => {
    let tasks = get(tasksByTeammateIdState)
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
  { teammateTaskSectionId: string }
>({
  key: key('taskIdsByTaskSectionIdState'),
  get:
    ({ teammateTaskSectionId }) =>
    ({ get }) => {
      let tasks = get(tasksByTeammateTaskSectionIdState(teammateTaskSectionId))
      tasks = tasks.filter((t) => !t.taskParentId)
      switch (true) {
        case get(isTabStatusState('List')) &&
          get(isTaskListSortStatusState('dueDate')): {
          tasks = filterTasks({ get })(tasks)
          return tasks.filter((t) => !t.dueDate).map((t) => t.id)
        }
        default: {
          tasks = sortTasks({ get })(tasks)
          tasks = filterTasks({ get })(tasks)
          return tasks.map((t) => t.id)
        }
      }
    },
})

export const taskIdsByDueDateState = selectorFamily<
  string[],
  { dueDate: string }
>({
  key: key('taskIdsByDueDateState'),
  get:
    ({ dueDate }) =>
    ({ get }) => {
      let tasks = get(tasksByTeammateIdState)
      tasks = filterByDueDate(dueDate)(tasks)

      return tasks.map((t) => t.id)
    },
})

export const taskIdsByProjectIdState = selectorFamily<string[], string>({
  key: key('taskIdsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      let tasks = get(tasksByTeammateIdState)
      tasks = filterByProjectTasks({ get, projectId })(tasks)
      tasks = filterTasks({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

export const taskIdsWithNoProjectState = selector<string[]>({
  key: key('taskIdsWithNoProjectState'),
  get: ({ get }) => {
    let tasks = get(tasksByTeammateIdState)
    tasks = filterByNoProject({ get })(tasks)

    return tasks.map((t) => t.id)
  },
})

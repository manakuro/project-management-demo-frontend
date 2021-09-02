import { selector, selectorFamily } from 'recoil'
import { uniq } from 'src/shared/utils'
import {
  filterTasks,
  filterByProjectTasks,
  filterByNoProject,
} from 'src/store/app/myTasks/filters'
import { projectTasksState } from 'src/store/entities/projectTasks'
import { tasksState, filterByTeammateId } from 'src/store/entities/tasks'

export const myTasksProjectIdsSelector = selector<string[]>({
  key: 'myTasksProjectIdsSelector',
  get: ({ get }) => {
    const projectTasks = get(projectTasksState)
    return uniq(projectTasks.map((p) => p.projectId))
  },
})

export const myTasksProjectTaskIdsSelector = selectorFamily<string[], string>({
  key: 'myTasksProjectTaskIdsSelector',
  get:
    (projectId: string) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByProjectTasks({ get, projectId })(tasks)
      tasks = filterTasks({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

export const myTasksTaskIdsWithNoProjectSelector = selectorFamily<
  string[],
  string
>({
  key: 'myTasksTaskIdsWithNoProjectSelector',
  get:
    (teammateId: string) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByTeammateId(teammateId)(tasks)
      tasks = filterByNoProject({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

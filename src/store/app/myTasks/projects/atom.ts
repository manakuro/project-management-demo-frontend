import { useMemo } from 'react'
import { selector, selectorFamily, useRecoilValue } from 'recoil'
import { uniq } from 'src/shared/utils'
import {
  filterByTeammateId,
  filterTasks,
  filterByProjectTasks,
  filterByNoProject,
} from 'src/store/app/myTasks/filters'
import { useMe } from 'src/store/entities/me'
import { projectTasksState } from 'src/store/entities/projectTasks'
import { tasksState } from 'src/store/entities/tasks'

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

export const useMyTasksProjectIds = () => {
  const ids = useRecoilValue(myTasksProjectIdsSelector)
  const projectIds = useMemo(() => ids, [ids])

  return {
    projectIds,
  }
}

export const useMyTasksTaskIdsWithNoProject = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTasksTaskIdsWithNoProjectSelector(me.id))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}

export const useMyTasksTaskIdsByProject = (projectId: string) => {
  const ids = useRecoilValue(myTasksProjectTaskIdsSelector(projectId))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}

import { useMemo } from 'react'
import { selector, selectorFamily, useRecoilValue } from 'recoil'
import { uniq } from 'src/shared/utils'
import { useMe } from 'src/store/entities/me'
import {
  projectTaskIdsByProjectIdSelector,
  projectTasksState,
} from 'src/store/entities/projectTasks'
import { Task, tasksState } from 'src/store/entities/tasks'

export const myTasksProjectIdsSelector = selector<string[]>({
  key: 'myTasksProjectIdsSelector',
  get: ({ get }) => {
    const projectTasks = get(projectTasksState)
    return uniq(projectTasks.map((p) => p.projectId))
  },
})

const filterByTeammateId = (teammateId: string) => (t: Task) =>
  !t.isDeleted && !t.taskParentId && t.assigneeId === teammateId
export const myTasksTaskIdsWithNoProjectSelector = selectorFamily<
  string[],
  string
>({
  key: 'myTasksTaskIdsWithNoProjectSelector',
  get:
    (teammateId: string) =>
    ({ get }) => {
      const tasks = get(tasksState)
      const projectTasks = get(projectTasksState)
      const taskIdsWithProject = uniq(projectTasks.map((p) => p.taskId))
      return tasks
        .filter(filterByTeammateId(teammateId))
        .filter((t) => !taskIdsWithProject.includes(t.id))
        .map((t) => t.id)
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
  const ids = useRecoilValue(projectTaskIdsByProjectIdSelector(projectId))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}

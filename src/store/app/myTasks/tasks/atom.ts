import { useMemo } from 'react'
import { selectorFamily, useRecoilValue } from 'recoil'
import {
  myTaskTaskStatusState,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
} from 'src/store/app/myTasks'
import { useMe } from 'src/store/entities/me'
import { Task, tasksState } from 'src/store/entities/tasks'

const filterByTeammateId = (teammateId: string) => (t: Task) =>
  !t.isDeleted && !t.taskParentId && t.assigneeId === teammateId
export const myTasksTaskIdsSelector = selectorFamily<string[], string>({
  key: 'myTasksTaskIdsSelector',
  get:
    (teammateId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      const taskStatus = get(myTaskTaskStatusState)

      if (taskStatus.sortStatus === TASK_LIST_SORT_STATUS_TYPE_DUE_DATE) {
        return tasks
          .filter(filterByTeammateId(teammateId))
          .filter((t) => !!t.dueDate)
          .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
          .map((t) => t.id)
      }

      return tasks.filter(filterByTeammateId(teammateId)).map((t) => t.id)
    },
})

const filterByTaskSectionId = (taskSectionId: string) => (t: Task) =>
  !t.isDeleted && !t.taskParentId && t.taskSectionId === taskSectionId
export const myTasksTaskIdsByTaskSectionIdSelector = selectorFamily<
  string[],
  string
>({
  key: 'myTasksTaskIdsByTaskSectionIdSelector',
  get:
    (taskSectionId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      const taskStatus = get(myTaskTaskStatusState)

      if (taskStatus.sortStatus === TASK_LIST_SORT_STATUS_TYPE_DUE_DATE) {
        return tasks
          .filter(filterByTaskSectionId(taskSectionId))
          .filter((t) => !t.dueDate)
          .map((t) => t.id)
      }

      return tasks.filter(filterByTaskSectionId(taskSectionId)).map((t) => t.id)
    },
})

export const useMyTasksTaskIds = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTasksTaskIdsSelector(me.id))
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}

export const useMyTasksTaskIdsByTaskSection = (taskSectionId: string) => {
  const ids = useRecoilValue(
    myTasksTaskIdsByTaskSectionIdSelector(taskSectionId),
  )
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}

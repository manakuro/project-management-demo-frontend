import { useMemo } from 'react'
import { selectorFamily, useRecoilValue } from 'recoil'
import {
  myTaskTaskStatusState,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
} from 'src/store/app/myTasks'
import {
  filterByTeammateId,
  filterTasks,
  filterByTaskSectionId,
  sortTasks,
} from 'src/store/app/myTasks/filters'
import { useMe } from 'src/store/entities/me'
import { tasksState } from 'src/store/entities/tasks'

export const myTasksTaskIdsSelector = selectorFamily<string[], string>({
  key: 'myTasksTaskIdsSelector',
  get:
    (teammateId) =>
    ({ get }) => {
      let tasks = get(tasksState)
      tasks = filterByTeammateId(teammateId)(tasks)
      tasks = sortTasks({ get })(tasks)
      tasks = filterTasks({ get })(tasks)

      return tasks.map((t) => t.id)
    },
})

export const myTasksTaskIdsByTaskSectionIdSelector = selectorFamily<
  string[],
  { taskSectionId: string; teammateId: string }
>({
  key: 'myTasksTaskIdsByTaskSectionIdSelector',
  get:
    ({ taskSectionId, teammateId }) =>
    ({ get }) => {
      let tasks = get(tasksState)
      const taskStatus = get(myTaskTaskStatusState)

      switch (true) {
        case taskStatus.sortStatus === TASK_LIST_SORT_STATUS_TYPE_DUE_DATE: {
          tasks = filterByTeammateId(teammateId)(tasks)
          tasks = filterByTaskSectionId(taskSectionId)(tasks)
          tasks = filterTasks({ get })(tasks)
          return tasks.filter((t) => !t.dueDate).map((t) => t.id)
        }
        default: {
          tasks = filterByTeammateId(teammateId)(tasks)
          tasks = filterByTaskSectionId(taskSectionId)(tasks)
          tasks = filterTasks({ get })(tasks)
          return tasks.map((t) => t.id)
        }
      }
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
  const { me } = useMe()
  const ids = useRecoilValue(
    myTasksTaskIdsByTaskSectionIdSelector({ taskSectionId, teammateId: me.id }),
  )
  const taskIds = useMemo(() => ids, [ids])

  return {
    taskIds,
  }
}

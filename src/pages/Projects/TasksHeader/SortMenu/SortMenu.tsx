import React, { memo, useCallback, useMemo } from 'react'
import { SortMenu as TasksHeaderSortMenu } from 'src/components/organisms/Tasks/TasksHeader'
import {
  useProjectsTaskListStatus,
  TaskListSortStatusType,
} from 'src/store/app/projects/taskListStatus'
import {
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_NONE,
} from 'src/store/entities/taskListStatus'

type Props = {}

const ITEMS: {
  value: TaskListSortStatusType
  text: string
}[] = [
  {
    value: TASK_LIST_SORT_STATUS_TYPE_NONE,
    text: 'None',
  },
  {
    value: TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
    text: 'Due Date',
  },
  {
    value: TASK_LIST_SORT_STATUS_TYPE_LIKES,
    text: 'Likes',
  },
  {
    value: TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
    text: 'Alphabetical',
  },
]

export const SortMenu: React.VFC<Props> = memo<Props>(() => {
  const { sortBy, isSorted, taskListStatus } = useProjectsTaskListStatus()

  const handleChange = useCallback(
    (status: ToString<TaskListSortStatusType>) => {
      sortBy(Number(status) as TaskListSortStatusType)
    },
    [sortBy],
  )
  const items = useMemo(() => ITEMS, [])

  const text = useMemo<string>(() => {
    if (isSorted('none')) return ''

    return `: ${
      items.find((i) => i.value === taskListStatus.taskListSortStatus)!.text
    }`
  }, [isSorted, items, taskListStatus.taskListSortStatus])

  return (
    <TasksHeaderSortMenu<TaskListSortStatusType>
      items={items}
      text={text}
      onChange={handleChange}
      defaultValue={taskListStatus.taskListSortStatus.toString()}
    />
  )
})
SortMenu.displayName = 'SortMenu'

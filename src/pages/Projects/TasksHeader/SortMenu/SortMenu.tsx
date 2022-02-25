import React, { memo, useCallback, useMemo } from 'react'
import { SortMenu as TasksHeaderSortMenu } from 'src/components/organisms/Tasks/TasksHeader'
import { useProjectsPageContext } from 'src/pages/Projects/Provider'
import {
  useProjectsTaskListStatus,
  TaskListSortStatusCodeValue,
} from 'src/store/app/projects/taskListStatus'
import { TaskListSortStatusCode } from 'src/store/entities/taskListSortStatus'

type Props = {}

const ITEMS: {
  value: TaskListSortStatusCodeValue
  text: string
}[] = [
  {
    value: TaskListSortStatusCode.None,
    text: 'None',
  },
  {
    value: TaskListSortStatusCode.DueDate,
    text: 'Due Date',
  },
  {
    value: TaskListSortStatusCode.Likes,
    text: 'Likes',
  },
  {
    value: TaskListSortStatusCode.Alphabetical,
    text: 'Alphabetical',
  },
  {
    value: TaskListSortStatusCode.Assignee,
    text: 'Assignee',
  },
  {
    value: TaskListSortStatusCode.CreationTime,
    text: 'Creation Time',
  },
  {
    value: TaskListSortStatusCode.Priority,
    text: 'Priority',
  },
]

export const SortMenu: React.VFC<Props> = memo<Props>(() => {
  const { sortBy, isSorted, taskListStatus } = useProjectsTaskListStatus()
  const { startContentLoading, endContentLoading } = useProjectsPageContext()

  const handleChange = useCallback(
    (status: TaskListSortStatusCodeValue) => {
      startContentLoading()
      setTimeout(() => {
        sortBy(status)
        endContentLoading()
      }, 200)
    },
    [endContentLoading, sortBy, startContentLoading],
  )
  const items = useMemo(() => ITEMS, [])

  const text = useMemo<string>(() => {
    if (isSorted('none')) return ''

    return `: ${
      items.find(
        (i) => i.value === taskListStatus.taskListSortStatus.statusCode,
      )!.text
    }`
  }, [isSorted, items, taskListStatus.taskListSortStatus])

  return (
    <TasksHeaderSortMenu<TaskListSortStatusCodeValue>
      items={items}
      text={text}
      onChange={handleChange}
      defaultValue={taskListStatus.taskListSortStatus.toString()}
    />
  )
})
SortMenu.displayName = 'SortMenu'

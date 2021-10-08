import React, { memo, useCallback, useMemo } from 'react'
import { SortMenu as TasksHeaderSortMenu } from 'src/components/organisms/Tasks/TasksHeader'
import {
  useMyTasksTaskListStatus,
  TaskListSortStatusType,
} from 'src/store/app/myTasks/taskListStatus'
import {
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
} from 'src/store/entities/taskListStatus'

type Props = {
  projectSortable?: boolean
}

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
  {
    value: TASK_LIST_SORT_STATUS_TYPE_PROJECT,
    text: 'Project',
  },
]

export const SortMenu: React.VFC<Props> = memo<Props>((props) => {
  const { sortBy, isSorted, taskListStatus } = useMyTasksTaskListStatus()

  const handleChange = useCallback(
    (status: ToString<TaskListSortStatusType>) => {
      sortBy(Number(status) as TaskListSortStatusType)
    },
    [sortBy],
  )
  const projectSortable = useMemo(
    () => props.projectSortable ?? true,
    [props.projectSortable],
  )
  const items = useMemo(() => {
    return ITEMS.filter((i) => {
      if (!projectSortable && i.value === TASK_LIST_SORT_STATUS_TYPE_PROJECT)
        return false
      return true
    })
  }, [projectSortable])

  const text = useMemo<string>(() => {
    if (isSorted('none')) return ''
    if (!projectSortable && isSorted('project')) return ''

    return `: ${
      items.find((i) => i.value === taskListStatus.taskListSortStatus)!.text
    }`
  }, [isSorted, items, projectSortable, taskListStatus.taskListSortStatus])

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

import React, { memo, useCallback, useMemo } from 'react'
import { SortMenu as TasksHeaderSortMenu } from 'src/components/organisms/Tasks/TasksHeader'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import {
  useMyTasksTaskListStatus,
  TaskListSortStatusCodeValue,
} from 'src/store/app/myTasks/taskListStatus'
import { TaskListSortStatusCode } from 'src/store/entities/taskListSortStatus'

type Props = {
  projectSortable?: boolean
}

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
    value: TaskListSortStatusCode.Project,
    text: 'Project',
  },
]

export const SortMenu: React.VFC<Props> = memo<Props>((props) => {
  const { sortBy, isSorted, taskListStatus } = useMyTasksTaskListStatus()
  const { setListContentLoading } = useMyTasksContext()

  const handleChange = useCallback(
    (status: TaskListSortStatusCodeValue) => {
      setListContentLoading(true)

      setTimeout(() => {
        sortBy(status)
        setListContentLoading(false)
      }, 200)
    },
    [setListContentLoading, sortBy],
  )
  const projectSortable = useMemo(
    () => props.projectSortable ?? true,
    [props.projectSortable],
  )
  const items = useMemo(() => {
    return ITEMS.filter((i) => {
      if (!projectSortable && i.value === TaskListSortStatusCode.Project)
        return false
      return true
    })
  }, [projectSortable])

  const text = useMemo<string>(() => {
    if (isSorted('none')) return ''
    if (!projectSortable && isSorted('project')) return ''

    return `: ${
      items.find(
        (i) => i.value === taskListStatus.taskListSortStatus.statusCode,
      )?.text
    }`
  }, [
    isSorted,
    items,
    projectSortable,
    taskListStatus.taskListSortStatus.statusCode,
  ])

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

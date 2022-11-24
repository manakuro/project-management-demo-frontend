import React, { memo } from 'react'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import { TaskListSortStatusCode } from 'src/store/entities/taskListSortStatus'
import { ListBasic } from './ListBasic'
import { ListSortByAlphabetical } from './ListSortByAlphabetical'
import { ListSortByDueDate } from './ListSortByDueDate'
import { ListSortByLike } from './ListSortByLike'
import { ListSortByProject } from './ListSortByProject'

export const TasksListLayout: React.FC = memo(() => {
  const { taskListStatus } = useTasksTaskListStatus()

  switch (taskListStatus.taskListSortStatus) {
    case TaskListSortStatusCode.DueDate: {
      return <ListSortByDueDate />
    }
    case TaskListSortStatusCode.Likes: {
      return <ListSortByLike />
    }
    case TaskListSortStatusCode.Alphabetical: {
      return <ListSortByAlphabetical />
    }
    case TaskListSortStatusCode.Project: {
      return <ListSortByProject />
    }
    default: {
      return <ListBasic />
    }
  }
})
TasksListLayout.displayName = 'TasksListLayout'

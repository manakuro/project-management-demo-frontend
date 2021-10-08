import React, { memo } from 'react'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import {
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
} from 'src/store/entities/taskListStatus'
import { ListBasic } from './ListBasic'
import { ListSortByAlphabetical } from './ListSortByAlphabetical'
import { ListSortByDueDate } from './ListSortByDueDate'
import { ListSortByLike } from './ListSortByLike'
import { ListSortByProject } from './ListSortByProject'

export const TasksListLayout: React.VFC = memo(() => {
  const { taskListStatus } = useTasksTaskListStatus()

  switch (taskListStatus.taskListSortStatus) {
    case TASK_LIST_SORT_STATUS_TYPE_DUE_DATE: {
      return <ListSortByDueDate />
    }
    case TASK_LIST_SORT_STATUS_TYPE_LIKES: {
      return <ListSortByLike />
    }
    case TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL: {
      return <ListSortByAlphabetical />
    }
    case TASK_LIST_SORT_STATUS_TYPE_PROJECT: {
      return <ListSortByProject />
    }
    default: {
      return <ListBasic />
    }
  }
})
TasksListLayout.displayName = 'TasksListLayout'

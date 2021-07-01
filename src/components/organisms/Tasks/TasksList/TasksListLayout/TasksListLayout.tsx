import React, { memo } from 'react'
import { useMyTasksTaskStatus } from 'src/store/app/myTasks'
import { ListBasic } from './ListBasic'
import { ListSortByAlphabetical } from './ListSortByAlphabetical'
import { ListSortByDueDate } from './ListSortByDueDate'
import { ListSortByLike } from './ListSortByLike'
import { ListSortByProject } from './ListSortByProject'

export const TasksListLayout: React.VFC = memo(() => {
  const { isSorted } = useMyTasksTaskStatus()

  switch (true) {
    case isSorted('dueDate'): {
      return <ListSortByDueDate />
    }
    case isSorted('likes'): {
      return <ListSortByLike />
    }
    case isSorted('alphabetical'): {
      return <ListSortByAlphabetical />
    }
    case isSorted('project'): {
      return <ListSortByProject />
    }
    default: {
      return <ListBasic />
    }
  }
})
TasksListLayout.displayName = 'TasksListLayout'

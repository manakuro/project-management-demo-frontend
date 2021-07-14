import React, { memo } from 'react'
import { useTasksContext } from 'src/components/organisms'
import { ListBasic } from './ListBasic'
import { ListSortByAlphabetical } from './ListSortByAlphabetical'
import { ListSortByDueDate } from './ListSortByDueDate'
import { ListSortByLike } from './ListSortByLike'
import { ListSortByProject } from './ListSortByProject'

export const TasksListLayout: React.VFC = memo(() => {
  const { useTaskStatus } = useTasksContext()
  const { isSorted } = useTaskStatus()

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

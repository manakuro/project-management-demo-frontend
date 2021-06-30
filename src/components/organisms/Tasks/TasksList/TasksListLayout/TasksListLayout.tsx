import React, { memo } from 'react'
import { useMyTasksTaskStatus } from 'src/store/app/myTasks'
import { ListBasic } from './ListBasic'
import { ListSortByDueDate } from './ListSortByDueDate'

export const TasksListLayout: React.VFC = memo(() => {
  const { isSorted } = useMyTasksTaskStatus()

  switch (true) {
    case isSorted('dueDate'): {
      return <ListSortByDueDate />
    }
    default: {
      return <ListBasic />
    }
  }
})
TasksListLayout.displayName = 'TasksListLayout'

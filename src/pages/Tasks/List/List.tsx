import React, { memo } from 'react'
import {
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TasksList,
  AddTaskButton,
  IncompleteTasksButton,
  SortButton,
} from 'src/components/organisms'

export const List: React.VFC = memo(() => {
  return (
    <TasksList>
      <TasksHeader>
        <TasksHeaderLeft>
          <AddTaskButton solid />
        </TasksHeaderLeft>
        <TasksHeaderRight>
          <IncompleteTasksButton />
          <SortButton />
        </TasksHeaderRight>
      </TasksHeader>
    </TasksList>
  )
})

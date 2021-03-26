import React, { memo } from 'react'
import { TasksHeader, TasksList, AddTaskButton } from 'src/components/organisms'

export const List: React.VFC = memo(() => {
  return (
    <TasksList>
      <TasksHeader>
        <AddTaskButton solid />
      </TasksHeader>
    </TasksList>
  )
})

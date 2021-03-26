import React, { memo } from 'react'

import { TasksHeader, TasksList } from 'src/components/organisms'

export const List: React.VFC = memo(() => {
  return (
    <TasksList>
      {({ onAddTask }) => {
        return <TasksHeader onAddTask={onAddTask} />
      }}
    </TasksList>
  )
})

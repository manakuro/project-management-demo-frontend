import React, { memo } from 'react'
import { TasksListSection, useTasksContext } from 'src/components/organisms'

export const ListBasic: React.VFC = memo(() => {
  const { useTaskSection } = useTasksContext()
  const { taskSectionIds } = useTaskSection()

  return (
    <>
      {taskSectionIds.map((id, i) => (
        <TasksListSection
          taskSectionId={id}
          key={id}
          showAddButton={taskSectionIds.length === i + 1}
        />
      ))}
    </>
  )
})
ListBasic.displayName = 'ListBasic'

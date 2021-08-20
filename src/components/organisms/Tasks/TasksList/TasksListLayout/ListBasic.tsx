import React, { memo } from 'react'
import {
  TasksListSection,
  useTaskSectionContext,
} from 'src/components/organisms/Tasks'

export const ListBasic: React.VFC = memo(() => {
  const { taskSectionIds } = useTaskSectionContext()

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

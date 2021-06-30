import React, { memo } from 'react'
import { TasksListSection } from 'src/components/organisms'
import { useMyTasks } from 'src/store/app/myTasks'

export const ListBasic: React.VFC = memo(() => {
  const { taskSectionIds } = useMyTasks()

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

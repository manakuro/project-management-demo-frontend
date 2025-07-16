import type React from 'react'
import { memo } from 'react'
import { TasksListSection } from 'src/components/features/organisms/Tasks'
import { useTasksTaskSectionIds } from 'src/components/features/organisms/Tasks/hooks'

export const ListBasic: React.FC = memo(() => {
  const { taskSectionIds } = useTasksTaskSectionIds()

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

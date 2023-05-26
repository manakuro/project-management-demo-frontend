import React, { memo } from 'react'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import { TasksListSectionProvider } from 'src/components/organisms/Tasks/TasksList/TasksListSection'
import { useTasksTaskIds } from 'src/components/organisms/Tasks/hooks'
import { Flex } from 'src/components/ui/atoms'

export const ListSortByAlphabetical: React.FC = memo(() => {
  const { taskIds } = useTasksTaskIds()

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {taskIds.map((id) => (
          <TasksListSectionProvider key={id} taskSectionId="">
            <TasksListItem taskId={id} />
          </TasksListSectionProvider>
        ))}
      </Flex>
    </Flex>
  )
})
ListSortByAlphabetical.displayName = 'ListSortByAlphabetical'

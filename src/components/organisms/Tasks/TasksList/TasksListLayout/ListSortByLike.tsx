import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTaskSectionContext } from 'src/components/organisms'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import { TasksListSectionProvider } from 'src/components/organisms/Tasks/TasksList/TasksListSection'

export const ListSortByLike: React.VFC = memo(() => {
  const { taskIds } = useTaskSectionContext()
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
ListSortByLike.displayName = 'ListSortByLike'

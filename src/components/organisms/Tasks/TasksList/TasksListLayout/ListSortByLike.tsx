import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksContext } from 'src/components/organisms'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'

export const ListSortByLike: React.VFC = memo(() => {
  const { taskIds } = useTasksContext()
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {taskIds.map((id) => (
          <TasksListItem taskId={id} key={id} />
        ))}
      </Flex>
    </Flex>
  )
})
ListSortByLike.displayName = 'ListSortByLike'

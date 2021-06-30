import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import { useMyTasks } from 'src/store/app/myTasks'

export const ListSortByLike: React.VFC = memo(() => {
  const { taskIds } = useMyTasks()

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

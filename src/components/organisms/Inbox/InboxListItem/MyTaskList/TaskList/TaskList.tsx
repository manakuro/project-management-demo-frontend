import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMyTaskListTaskIds } from 'src/components/organisms/Inbox'
import { TaskListItem } from '../TaskListItem'

type Props = FlexProps & {
  myTaskListId: string
}

export const TaskList: React.FC<Props> = memo<Props>((props) => {
  const { myTaskListId } = props
  const { taskIds } = useMyTaskListTaskIds(myTaskListId)

  return (
    <Flex flex={1} mt={4} flexDirection="column">
      {taskIds.map((id, i) => (
        <TaskListItem
          taskId={id}
          key={id}
          isFirst={i === 0}
          isLast={taskIds.length - 1 === i}
        />
      ))}
    </Flex>
  )
})

TaskList.displayName = 'TaskList'

import React, { memo } from 'react'
import { useWorkspaceActivityTaskIds } from 'src/components/organisms/Inbox/hooks'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { TaskListItem } from '../TaskListItem'

type Props = FlexProps & {
  workspaceActivityId: string
}

export const TaskList: React.FC<Props> = memo<Props>((props) => {
  const { workspaceActivityId } = props
  const { taskIds } = useWorkspaceActivityTaskIds(workspaceActivityId)

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

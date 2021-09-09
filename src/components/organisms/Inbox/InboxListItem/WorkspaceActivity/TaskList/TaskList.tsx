import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useWorkspaceActivityTasksTaskIds } from 'src/store/app/inbox/activity/workspaceActivityTasks'
import { TaskListItem } from '../TaskListItem'

type Props = FlexProps & {
  workspaceActivityId: string
}

export const TaskList: React.FC<Props> = memo<Props>((props) => {
  const { workspaceActivityId } = props
  const { taskIds } = useWorkspaceActivityTasksTaskIds(workspaceActivityId)

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

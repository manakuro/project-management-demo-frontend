import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMyTaskActivityTasksTaskIds } from 'src/store/app/inbox/activity/myTaskActivityTasks'
import { TaskListItem } from '../TaskListItem'

type Props = FlexProps & {
  taskActivityId: string
}

export const TaskList: React.FC<Props> = memo<Props>((props) => {
  const { taskActivityId } = props
  const { taskIds } = useMyTaskActivityTasksTaskIds(taskActivityId)

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

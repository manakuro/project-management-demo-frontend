import React, { memo } from 'react'
import { Flex, Icon, Text } from 'src/components/atoms'
import { useTask } from 'src/store/entities/task'
import { useTasksNameContext } from '../TasksNameProvider'

type Props = {}

export const TaskParentName: React.VFC<Props> = memo<Props>(() => {
  const { taskId } = useTasksNameContext()
  const { isSubtask, task } = useTask(taskId)
  const { task: taskParent } = useTask(task.taskParentId)

  if (!isSubtask) return null

  return (
    <Flex alignItems="center" ml={2}>
      <Icon icon="chevronLeft" color="text.muted" size="xs" />
      <Text fontSize="xs" color="text.muted" isTruncated maxW="100px">
        {taskParent.name}
      </Text>
    </Flex>
  )
})
TaskParentName.displayName = 'TaskParentName'

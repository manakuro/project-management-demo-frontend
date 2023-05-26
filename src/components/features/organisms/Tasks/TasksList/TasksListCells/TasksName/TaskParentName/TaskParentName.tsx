import React, { memo } from 'react'
import { useTasksContext } from 'src/components/features/organisms/Tasks'
import { Flex, Icon, Text } from 'src/components/ui/atoms'
import { useTask } from 'src/store/entities/task'
import { useTasksNameContext } from '../TasksNameProvider'

type Props = {}

export const TaskParentName: React.FC<Props> = memo<Props>(() => {
  const { taskId } = useTasksNameContext()
  const { isSubtask, task } = useTask(taskId)
  const { task: taskParent } = useTask(task.taskParentId)
  const { isProjectsPage } = useTasksContext()

  if (!isSubtask || isProjectsPage) return null

  return (
    <Flex alignItems="center" ml={2}>
      <Icon icon="chevronLeft" color="text.muted" size="xs" />
      <Text fontSize="xs" color="text.muted" noOfLines={1} maxW="100px">
        {taskParent.name}
      </Text>
    </Flex>
  )
})
TaskParentName.displayName = 'TaskParentName'

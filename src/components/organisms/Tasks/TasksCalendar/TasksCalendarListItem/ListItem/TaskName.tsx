import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
} & FlexProps

export const TaskName: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task } = useTask(taskId)

  return (
    <Flex
      noOfLines={2}
      flex={1}
      ml={1}
      fontSize="xs"
      fontWeight="medium"
      lineHeight="14px"
    >
      {task.name}
    </Flex>
  )
})
TaskName.displayName = 'TaskName'

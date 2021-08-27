import React, { useMemo } from 'react'
import { Flex, Icon, Text } from 'src/components/atoms'
import { useTaskIdsByTaskParentId } from 'src/store/entities/tasks'

type Props = {
  taskId: string
}

export const Subtask: React.VFC<Props> = (props) => {
  const { taskId } = props
  const { taskIds } = useTaskIdsByTaskParentId(taskId)
  const size = useMemo(() => taskIds.length, [taskIds.length])

  if (!size) return null

  return (
    <Flex alignItems="center" justifyContent="center">
      <Text fontSize="xs" color="inherit">
        {size}
      </Text>
      <Icon icon="flowChildren" color="inherit" />
    </Flex>
  )
}
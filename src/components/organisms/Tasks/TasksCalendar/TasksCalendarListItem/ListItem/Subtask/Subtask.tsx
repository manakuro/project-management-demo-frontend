import React, { useMemo } from 'react'
import { Flex, Icon, Text } from 'src/components/atoms'
import { useTasksSubTaskIds } from 'src/components/organisms/Tasks/hooks'

type Props = {
  taskId: string
}

export const Subtask: React.VFC<Props> = (props) => {
  const { taskId } = props
  const { taskIds } = useTasksSubTaskIds(taskId)
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

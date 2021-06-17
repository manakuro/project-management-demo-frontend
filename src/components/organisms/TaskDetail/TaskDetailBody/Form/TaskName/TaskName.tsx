import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { useTask } from 'src/store/entities/tasks'
import { Input } from './Input'

type Props = {
  taskId: string
}

export const TaskName: React.FC<Props> = memo<Props>((props) => {
  const { task, setTaskName } = useTask(props.taskId)

  const handleChange = useCallback(
    async (val: string) => {
      await setTaskName(val)
    },
    [setTaskName],
  )

  return (
    <Flex px={4}>
      <Input value={task.name} onChange={handleChange} />
    </Flex>
  )
})
TaskName.displayName = 'TaskName'

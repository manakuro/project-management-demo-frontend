import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { Input } from './Input'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
}

export const TaskName: React.FC<Props> = memo<Props>((props) => {
  const { task, setTask } = useTask(props.taskId)

  const handleChange = useCallback(
    async (val: string) => {
      await setTask({ name: val })
    },
    [setTask],
  )

  return (
    <Flex px={4}>
      <Input value={task.name} onChange={handleChange} />
    </Flex>
  )
})
TaskName.displayName = 'TaskName'

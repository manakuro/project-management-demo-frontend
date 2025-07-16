import type React from 'react'
import { memo, useCallback } from 'react'
import { Flex } from 'src/components/ui/atoms'
import { useTask } from 'src/store/entities/task'
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
    <Flex>
      <Input value={task.name} onChange={handleChange} />
    </Flex>
  )
})
TaskName.displayName = 'TaskName'

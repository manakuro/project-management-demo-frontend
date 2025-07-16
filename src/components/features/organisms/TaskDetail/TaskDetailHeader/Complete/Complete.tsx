import type React from 'react'
import { memo, useCallback } from 'react'
import { Button, CheckIcon } from 'src/components/ui/atoms'
import { useTask } from 'src/store/entities/task'

type Props = {
  taskId: string
}

export const Complete: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task, setTask } = useTask(taskId)

  const handleToggleComplete = useCallback(async () => {
    await setTask({ completed: !task.completed })
  }, [setTask, task.completed])

  if (task.completed)
    return (
      <Button
        leftIcon={<CheckIcon completed mt="0.75px" />}
        colorScheme="teal"
        variant="outline"
        isActive
        size="xs"
        onClick={handleToggleComplete}
      >
        Completed
      </Button>
    )

  return (
    <Button
      leftIcon={<CheckIcon completed={false} mt="0.75px" />}
      colorScheme="teal"
      variant="outline"
      size="xs"
      onClick={handleToggleComplete}
    >
      Mark complete
    </Button>
  )
})
Complete.displayName = 'Complete'

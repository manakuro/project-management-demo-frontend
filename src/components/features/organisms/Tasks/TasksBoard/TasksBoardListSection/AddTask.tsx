import React, { memo, useCallback } from 'react'
import { useTasksTask } from 'src/components/features/organisms/Tasks/hooks'
import { Button, ButtonProps, Icon } from 'src/components/ui/atoms'

type Props = {
  taskSectionId: string
} & ButtonProps

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { taskSectionId, ...rest } = props
  const { addTask } = useTasksTask()

  const handleClick = useCallback(() => {
    addTask({ taskSectionId })
  }, [addTask, taskSectionId])

  return (
    <Button
      mt={2}
      onClick={handleClick}
      leftIcon={<Icon icon="plus" />}
      variant="ghost"
      size="md"
      fontSize="sm"
      {...rest}
    >
      Add task
    </Button>
  )
})
AddTask.displayName = 'AddTask'

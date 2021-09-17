import React, { memo, useCallback } from 'react'
import { Button, ButtonProps, Icon } from 'src/components/atoms'
import { useTaskFromTasks } from 'src/components/organisms/Tasks/hooks'

type Props = {
  taskSectionId: string
} & ButtonProps

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { taskSectionId, ...rest } = props
  const { addTask } = useTaskFromTasks()

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

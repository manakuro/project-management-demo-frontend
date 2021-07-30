import React, { memo, useCallback } from 'react'
import { Button, ButtonProps, Icon } from 'src/components/atoms'
import { useTaskContext } from 'src/components/organisms'

type Props = {
  taskSectionId: string
} & ButtonProps

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { taskSectionId, ...rest } = props
  const { addTask } = useTaskContext(taskSectionId)

  const handleClick = useCallback(async () => {
    await addTask()
  }, [addTask])

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

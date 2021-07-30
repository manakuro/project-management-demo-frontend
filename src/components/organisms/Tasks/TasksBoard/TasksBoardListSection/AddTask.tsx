import React, { memo, useCallback } from 'react'
import { Button, Icon } from 'src/components/atoms'
import { useTaskContext } from 'src/components/organisms'

type Props = {
  taskSectionId: string
}

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { addTask } = useTaskContext(props.taskSectionId)

  const handleClick = useCallback(async () => {
    await addTask()
  }, [addTask])

  return (
    <Button
      mt={2}
      onClick={handleClick}
      leftIcon={<Icon icon="plus" />}
      variant="ghost"
      size="sm"
    >
      Add task
    </Button>
  )
})
AddTask.displayName = 'AddTask'

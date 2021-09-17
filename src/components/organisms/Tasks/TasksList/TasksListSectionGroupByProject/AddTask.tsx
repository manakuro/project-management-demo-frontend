import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { useTaskFromTasks } from 'src/components/organisms/Tasks/hooks'
import { useClickableHoverStyle } from 'src/hooks'

type Props = {
  taskSectionId: string
}

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { addTask } = useTaskFromTasks(props.taskSectionId)
  const { clickableHoverStyle } = useClickableHoverStyle()

  const handleClick = useCallback(async () => {
    await addTask()
  }, [addTask])

  return (
    <Flex
      h="36px"
      minH="36px"
      fontSize="sm"
      color="text.muted"
      pl="68px"
      alignItems="center"
      flex={1}
      {...clickableHoverStyle}
      onClick={handleClick}
    >
      Add task...
    </Flex>
  )
})
AddTask.displayName = 'AddTask'

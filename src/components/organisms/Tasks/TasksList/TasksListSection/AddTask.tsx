import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { useTaskFromTasks } from 'src/components/organisms/Tasks/hooks'
import { useClickableHoverStyle } from 'src/hooks'

type Props = {
  taskSectionId: string
}

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { addTask } = useTaskFromTasks(props.taskSectionId)
  const { clickableHoverStyle } = useClickableHoverStyle()
  const { stickyStyle } = useTasksListContext()

  const handleClick = useCallback(async () => {
    await addTask()
  }, [addTask])

  return (
    <Flex
      h="36px"
      minH="36px"
      fontSize="sm"
      color="text.muted"
      alignItems="center"
      flex={1}
      {...clickableHoverStyle}
      onClick={handleClick}
    >
      <Flex {...stickyStyle} pl="68px" bg="inherit">
        Add task...
      </Flex>
    </Flex>
  )
})
AddTask.displayName = 'AddTask'

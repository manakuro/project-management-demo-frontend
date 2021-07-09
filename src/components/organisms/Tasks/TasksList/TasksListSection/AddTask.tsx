import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksContext } from 'src/components/organisms'
import { useClickableHoverStyle } from 'src/hooks'
import { useStickyListStyle } from 'src/hooks/styles/useStickyListStyle'

type Props = {
  taskSectionId: string
}

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { useTaskByTaskSection } = useTasksContext()
  const { addTask } = useTaskByTaskSection(props.taskSectionId)
  const { clickableHoverStyle } = useClickableHoverStyle()
  const { stickyStyle } = useStickyListStyle()

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

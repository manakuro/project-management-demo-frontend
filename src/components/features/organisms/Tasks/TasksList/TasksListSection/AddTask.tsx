import type React from 'react'
import { memo, useCallback } from 'react'
import { useTasksListContext } from 'src/components/features/organisms/Tasks/TasksList/Provider'
import { useTasksTask } from 'src/components/features/organisms/Tasks/hooks'
import { Flex } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'

type Props = {
  taskSectionId: string
}

export const AddTask: React.FC<Props> = memo<Props>((props) => {
  const { addTask } = useTasksTask()
  const { clickableHoverStyle } = useClickableHoverStyle()
  const { stickyStyle } = useTasksListContext()

  const handleClick = useCallback(() => {
    addTask({ taskSectionId: props.taskSectionId })
  }, [addTask, props.taskSectionId])

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

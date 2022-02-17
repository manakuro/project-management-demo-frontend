import React, { memo, useCallback } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { useTasksListContext } from 'src/components/organisms/Tasks'
import { useTasksTaskSectionCommand } from 'src/components/organisms/Tasks/hooks'

type Props = {}

export const AddTaskSection: React.FC<Props> = memo<Props>(() => {
  const { addTaskSection } = useTasksTaskSectionCommand()
  const { stickyStyle } = useTasksListContext()

  const handleClick = useCallback(() => {
    addTaskSection()
  }, [addTaskSection])

  return (
    <Flex w={40} mt={4} pl={6} {...stickyStyle}>
      <Button
        leftIcon={<Icon icon="plus" />}
        colorScheme="teal"
        variant="ghost"
        onClick={handleClick}
        size="sm"
      >
        Add section
      </Button>
    </Flex>
  )
})
AddTaskSection.displayName = 'AddTaskSection'

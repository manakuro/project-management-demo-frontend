import React, { memo, useCallback } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { useTasksContext } from 'src/components/organisms'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'

type Props = {}

export const AddTaskSection: React.FC<Props> = memo<Props>(() => {
  const { addTaskSection, setAddedTaskSectionId } = useTasksContext()
  const { stickyStyle } = useTasksListContext()

  const handleClick = useCallback(() => {
    const id = addTaskSection()
    setAddedTaskSectionId(id)
  }, [addTaskSection, setAddedTaskSectionId])

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

import { memo, useCallback } from 'react'
import { useTasksListContext } from 'src/components/features/organisms/Tasks'
import { useTasksTaskSectionCommand } from 'src/components/features/organisms/Tasks/hooks'
import { Button, Flex, Icon } from 'src/components/ui/atoms'

export const AddTaskSection = memo(function AddTaskSection() {
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

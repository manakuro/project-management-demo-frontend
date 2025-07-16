import { memo, useCallback } from 'react'
import { useTasksTaskSectionCommand } from 'src/components/features/organisms/Tasks/hooks'
import { Button, Flex, Icon } from 'src/components/ui/atoms'

export const AddTaskSection = memo(function AddTaskSection() {
  const { addTaskSection } = useTasksTaskSectionCommand()

  const handleClick = useCallback(async () => {
    addTaskSection()
  }, [addTaskSection])

  return (
    <Flex w={40} mt={3} ml={2}>
      <Button
        leftIcon={<Icon icon="plus" />}
        variant="ghost"
        onClick={handleClick}
        size="sm"
      >
        Add section
      </Button>
    </Flex>
  )
})

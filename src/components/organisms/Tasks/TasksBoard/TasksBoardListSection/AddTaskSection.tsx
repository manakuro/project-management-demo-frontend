import React, { memo, useCallback } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { useTasksTaskSectionCommand } from 'src/components/organisms/Tasks/hooks'

type Props = {}

export const AddTaskSection: React.FC<Props> = memo<Props>(() => {
  const { addTaskSection, setAddedTaskSectionId } = useTasksTaskSectionCommand()

  const handleClick = useCallback(async () => {
    const id = await addTaskSection()
    setAddedTaskSectionId(id)
  }, [addTaskSection, setAddedTaskSectionId])

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
AddTaskSection.displayName = 'AddTaskSection'

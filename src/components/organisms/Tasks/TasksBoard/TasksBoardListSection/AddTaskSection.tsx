import React, { memo, useCallback } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { useTasksTaskSectionCommand } from 'src/components/organisms/Tasks/hooks'

type Props = {}

export const AddTaskSection: React.FC<Props> = memo<Props>(() => {
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
AddTaskSection.displayName = 'AddTaskSection'

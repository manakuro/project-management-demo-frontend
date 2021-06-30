import React, { memo, useCallback } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { useMyTaskCommands } from 'src/store/app/myTasks'

type Props = {}

export const AddTaskSection: React.FC<Props> = memo<Props>(() => {
  const { addMyTaskSection } = useMyTaskCommands()

  const handleClick = useCallback(() => {
    addMyTaskSection()
  }, [addMyTaskSection])

  return (
    <Flex w={40} mt={4}>
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
AddTaskSection.displayName = 'TasksListSectionAddButton'

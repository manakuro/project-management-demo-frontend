import React, { memo, useCallback } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { useTasksList } from 'src/components/organisms/Tasks/TasksList/Provider'
import { useMyTaskCommands } from 'src/store/app/myTasks'

type Props = {}

export const AddTaskSection: React.FC<Props> = memo<Props>(() => {
  const { addMyTaskSection } = useMyTaskCommands()
  const { setAddedTaskSectionId } = useTasksList()

  const handleClick = useCallback(() => {
    const id = addMyTaskSection()
    setAddedTaskSectionId(id)
  }, [addMyTaskSection, setAddedTaskSectionId])

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

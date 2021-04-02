import React, { memo, useCallback, useState } from 'react'
import { Flex, Heading, Icon, IconButton } from 'src/components/atoms'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'

type Props = {
  title: string
}

export const TasksListSection: React.FC<Props> = memo<Props>((props) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
    <Flex flex={1} flexDirection="column">
      <Flex h="50px" alignItems="center">
        <IconButton
          aria-label="Task list expand button"
          icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
          variant="ghost"
          onClick={handleToggle}
        />
        <Heading as="h3" size="sm" ml={2} fontWeight="semibold">
          {props.title}
        </Heading>
      </Flex>
      {isExpanded && (
        <Flex flexDirection="column">
          <TasksListRow />
          <TasksListRow />
        </Flex>
      )}
    </Flex>
  )
})

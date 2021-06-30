import React, { memo, useCallback, useState } from 'react'
import { Box, Flex, Icon, IconButton } from 'src/components/atoms'
import { TasksListSection } from 'src/components/organisms'
import { useMyTasks } from 'src/store/app/myTasks'

export const ListSortByDueDate: React.VFC = memo(() => {
  const { taskSectionIds } = useMyTasks()
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <IconButton
          aria-label="Task list expand button"
          icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
          variant="ghost"
          onClick={handleToggle}
        />
        <Box px={2} fontWeight="semibold">
          No Due Date
        </Box>
      </Flex>
      {isExpanded && (
        <Flex flexDirection="column">
          {taskSectionIds.map((id, i) => (
            <TasksListSection
              taskSectionId={id}
              key={id}
              showAddButton={taskSectionIds.length === i + 1}
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
})
ListSortByDueDate.displayName = 'ListSortByDueDate'

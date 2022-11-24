import React, { memo, useCallback, useState } from 'react'
import { Box, Flex, Icon, IconButton } from 'src/components/atoms'
import { TasksListSection } from 'src/components/organisms/Tasks'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import { TasksListSectionProvider } from 'src/components/organisms/Tasks/TasksList/TasksListSection'
import {
  useTasksTaskIds,
  useTasksTaskSectionIds,
} from 'src/components/organisms/Tasks/hooks'

export const ListSortByDueDate: React.FC = memo(() => {
  const { taskIds } = useTasksTaskIds()
  const { taskSectionIds } = useTasksTaskSectionIds()
  const [isExpanded, setIsExpanded] = useState(true)
  const { stickyStyle } = useTasksListContext()

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {taskIds.map((id) => (
          <TasksListSectionProvider key={id} taskSectionId="">
            <TasksListItem taskId={id} />
          </TasksListSectionProvider>
        ))}
      </Flex>
      <Flex>
        <Flex alignItems="center" mt={6} pl={6} {...stickyStyle}>
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
      </Flex>
      {isExpanded && (
        <Flex flexDirection="column">
          {taskSectionIds.map((id, i) => (
            <TasksListSection
              indented
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

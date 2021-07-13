import React, { memo, useCallback, useState } from 'react'
import { Box, Flex, Icon, IconButton } from 'src/components/atoms'
import { TasksListSectionGroupByProject } from 'src/components/organisms'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import {
  useMyTasksProjectIds,
  useMyTasksTaskIdsWithNoProject,
} from 'src/store/app/myTasks/projects'

export const ListSortByProject: React.VFC = memo(() => {
  const { projectIds } = useMyTasksProjectIds()
  const { taskIds } = useMyTasksTaskIdsWithNoProject()
  const { stickyStyle } = useTasksListContext()
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
    <Flex flexDirection="column">
      {projectIds.map((id) => (
        <TasksListSectionGroupByProject projectId={id} key={id} />
      ))}
      <Flex>
        <Flex alignItems="center" mt={6} pl={6} {...stickyStyle}>
          <IconButton
            aria-label="Task list expand button"
            icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
            variant="ghost"
            onClick={handleToggle}
          />
          <Box px={2} fontWeight="semibold">
            No Project
          </Box>
        </Flex>
      </Flex>
      {isExpanded && (
        <Flex flexDirection="column">
          {taskIds.map((id) => (
            <TasksListItem taskId={id} key={id} />
          ))}
        </Flex>
      )}
    </Flex>
  )
})
ListSortByProject.displayName = 'ListSortByProject'

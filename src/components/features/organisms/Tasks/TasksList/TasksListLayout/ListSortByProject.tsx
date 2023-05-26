import React, { memo, useCallback, useState } from 'react'
import { TasksListSectionGroupByProject } from 'src/components/features/organisms/Tasks'
import { useTasksListContext } from 'src/components/features/organisms/Tasks/TasksList/Provider'
import { TasksListItem } from 'src/components/features/organisms/Tasks/TasksList/TasksListItem'
import { TasksListSectionProvider } from 'src/components/features/organisms/Tasks/TasksList/TasksListSection'
import { Box, Flex, Icon, IconButton } from 'src/components/ui/atoms'
import { useMyTasksProjectIds } from 'src/store/app/myTasks/projects'
import { useMyTasksTaskIdsWithNoProject } from 'src/store/app/myTasks/tasks'

export const ListSortByProject: React.FC = memo(() => {
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
            <TasksListSectionProvider key={id} taskSectionId="">
              <TasksListItem taskId={id} />
            </TasksListSectionProvider>
          ))}
        </Flex>
      )}
    </Flex>
  )
})
ListSortByProject.displayName = 'ListSortByProject'

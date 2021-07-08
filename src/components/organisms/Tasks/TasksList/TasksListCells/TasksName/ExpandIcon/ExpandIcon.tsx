import React, { memo, useMemo } from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { useTasksContext } from 'src/components/organisms'
import { useTasksNameContext } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTaskIdsByTaskParentId } from 'src/store/entities/tasks'

type Props = {}

export const ExpandIcon: React.FC<Props> = memo<Props>(() => {
  const { isProjectsPage } = useTasksContext()
  const { taskId } = useTasksNameContext()
  const { taskIds } = useTaskIdsByTaskParentId(taskId)
  const showIcon = useMemo(
    () => isProjectsPage && !!taskIds.length,
    [isProjectsPage, taskIds.length],
  )

  return (
    <IconButton
      aria-label="Show sub task"
      icon={<Icon icon="chevronRight" color="text.muted" size="sm" />}
      visibility={showIcon ? 'visible' : 'hidden'}
      size="xs"
      h={5}
      minW={5}
      p={0}
      variant="ghost"
    />
  )
})
ExpandIcon.displayName = 'ExpandIcon'

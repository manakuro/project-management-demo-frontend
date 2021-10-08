import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import { useTaskListStatus } from 'src/store/entities/taskListStatus'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { sortByProject, sortByNone, taskListStatus } = useTasksTaskListStatus()
  const { isSortProject } = useTaskListStatus()

  const handleSort = useCallback(() => {
    if (isSortProject(taskListStatus.taskListSortStatus)) {
      sortByNone()
      return
    }

    sortByProject?.()
  }, [
    isSortProject,
    sortByNone,
    sortByProject,
    taskListStatus.taskListSortStatus,
  ])

  return (
    <Container
      tasksTaskColumnId={tasksTaskColumnId}
      clickable
      onClick={handleSort}
      onSort={handleSort}
      menu
    >
      {isSortProject(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="text.muted" />
      )}
    </Container>
  )
})
Projects.displayName = 'Projects'

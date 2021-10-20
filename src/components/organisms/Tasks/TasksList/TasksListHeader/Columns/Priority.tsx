import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import { useTaskListStatus } from 'src/store/entities/taskListStatus'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const Priority: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { sortByNone, taskListStatus, sortByPriority } =
    useTasksTaskListStatus()
  const { isSortedByPriority } = useTaskListStatus()

  const handleSort = useCallback(() => {
    if (isSortedByPriority(taskListStatus.taskListSortStatus)) {
      sortByNone()
      return
    }

    sortByPriority?.()
  }, [
    isSortedByPriority,
    sortByPriority,
    sortByNone,
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
      {isSortedByPriority(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="text.muted" />
      )}
    </Container>
  )
})
Priority.displayName = 'Priority'

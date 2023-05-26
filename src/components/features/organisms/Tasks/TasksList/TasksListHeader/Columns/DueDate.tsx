import React, { memo, useCallback } from 'react'
import { useTasksTaskListStatus } from 'src/components/features/organisms/Tasks/hooks'
import { Icon } from 'src/components/ui/atoms'
import { useTaskListSortStatus } from 'src/store/entities/taskListSortStatus'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { sortByDueDate, sortByNone, taskListStatus } = useTasksTaskListStatus()
  const { isSortedByDueDate } = useTaskListSortStatus()

  const handleSort = useCallback(() => {
    if (isSortedByDueDate(taskListStatus.taskListSortStatus)) {
      sortByNone()
      return
    }

    sortByDueDate()
  }, [
    isSortedByDueDate,
    sortByDueDate,
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
      {isSortedByDueDate(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="text.muted" />
      )}
    </Container>
  )
})
DueDate.displayName = 'DueDate'

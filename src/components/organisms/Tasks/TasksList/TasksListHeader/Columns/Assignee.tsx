import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import { useTaskListStatus } from 'src/store/entities/taskListStatus'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const Assignee: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { sortByDueDate, sortByNone, taskListStatus } = useTasksTaskListStatus()
  const { isSortDueDate } = useTaskListStatus()

  const handleSort = useCallback(() => {
    if (isSortDueDate(taskListStatus.taskListSortStatus)) {
      sortByNone()
      return
    }

    sortByDueDate()
  }, [
    isSortDueDate,
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
      {isSortDueDate(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="text.muted" />
      )}
    </Container>
  )
})
Assignee.displayName = 'Assignee'

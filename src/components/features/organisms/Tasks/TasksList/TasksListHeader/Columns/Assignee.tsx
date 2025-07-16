import type React from 'react'
import { memo, useCallback } from 'react'
import { useTasksTaskListStatus } from 'src/components/features/organisms/Tasks/hooks'
import { Icon } from 'src/components/ui/atoms'
import { useTaskListSortStatus } from 'src/store/entities/taskListSortStatus'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const Assignee: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { sortByAssignee, sortByNone, taskListStatus } =
    useTasksTaskListStatus()
  const { isSortedByAssignee } = useTaskListSortStatus()

  const handleSort = useCallback(() => {
    if (isSortedByAssignee(taskListStatus.taskListSortStatus)) {
      sortByNone()
      return
    }

    sortByAssignee?.()
  }, [
    isSortedByAssignee,
    sortByAssignee,
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
      {isSortedByAssignee(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="text.muted" />
      )}
    </Container>
  )
})
Assignee.displayName = 'Assignee'

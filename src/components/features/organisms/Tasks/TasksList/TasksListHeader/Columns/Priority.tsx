import type React from 'react'
import { memo, useCallback } from 'react'
import { useTasksTaskListStatus } from 'src/components/features/organisms/Tasks/hooks'
import { Icon } from 'src/components/ui/atoms'
import { useTaskListSortStatus } from 'src/store/entities/taskListSortStatus'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const Priority: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { sortByNone, taskListStatus, sortByPriority } =
    useTasksTaskListStatus()
  const { isSortedByPriority } = useTaskListSortStatus()

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

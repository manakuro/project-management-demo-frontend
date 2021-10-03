import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useTasksTaskListStatus } from 'src/components/organisms/Tasks/hooks'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { onSort, isSorted } = useTasksTaskListStatus()

  const handleSort = useCallback(() => {
    if (isSorted('dueDate')) {
      onSort('none')
      return
    }

    onSort('dueDate')
  }, [isSorted, onSort])

  return (
    <Container
      tasksTaskColumnId={tasksTaskColumnId}
      clickable
      onClick={handleSort}
      onSort={handleSort}
      menu
    >
      {isSorted('dueDate') && <Icon icon="arrowDownAlt" color="text.muted" />}
    </Container>
  )
})
DueDate.displayName = 'DueDate'

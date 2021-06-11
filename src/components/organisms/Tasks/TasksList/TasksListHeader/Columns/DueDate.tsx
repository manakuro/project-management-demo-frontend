import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useMyTasksTaskStatus } from 'src/store/app/myTasks'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props
  const { isSorted, onSort } = useMyTasksTaskStatus()

  const handleClick = useCallback(() => {
    if (isSorted('dueDate')) {
      onSort('none')
      return
    }

    onSort('dueDate')
  }, [isSorted, onSort])

  return (
    <Container taskColumnId={taskColumnId} clickable onClick={handleClick}>
      {isSorted('dueDate') && <Icon icon="arrowDownAlt" color="text.muted" />}
    </Container>
  )
})
DueDate.displayName = 'DueDate'

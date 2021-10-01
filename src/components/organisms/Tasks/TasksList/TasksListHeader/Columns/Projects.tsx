import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useTasksTaskStatus } from 'src/components/organisms/Tasks/hooks'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { onSort, isSorted } = useTasksTaskStatus()

  const handleSort = useCallback(() => {
    if (isSorted('project')) {
      onSort('none')
      return
    }

    onSort('project')
  }, [isSorted, onSort])

  return (
    <Container
      tasksTaskColumnId={tasksTaskColumnId}
      clickable
      onClick={handleSort}
      onSort={handleSort}
      menu
    >
      {isSorted('project') && <Icon icon="arrowDownAlt" color="text.muted" />}
    </Container>
  )
})
Projects.displayName = 'Projects'

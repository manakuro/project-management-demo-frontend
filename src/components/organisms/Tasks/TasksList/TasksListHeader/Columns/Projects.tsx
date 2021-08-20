import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useTaskStatusContext } from 'src/components/organisms/Tasks'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props
  const { onSort, isSorted } = useTaskStatusContext()

  const handleSort = useCallback(() => {
    if (isSorted('project')) {
      onSort('none')
      return
    }

    onSort('project')
  }, [isSorted, onSort])

  return (
    <Container
      taskColumnId={taskColumnId}
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

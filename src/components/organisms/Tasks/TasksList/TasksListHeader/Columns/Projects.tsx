import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { useTaskStatusContext } from 'src/components/organisms'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props
  const { onSort, isSorted } = useTaskStatusContext()

  const handleClick = useCallback(() => {
    if (isSorted('project')) {
      onSort('none')
      return
    }

    onSort('project')
  }, [isSorted, onSort])

  return (
    <Container taskColumnId={taskColumnId} clickable onClick={handleClick}>
      {isSorted('project') && <Icon icon="arrowDownAlt" color="text.muted" />}
    </Container>
  )
})
Projects.displayName = 'Projects'

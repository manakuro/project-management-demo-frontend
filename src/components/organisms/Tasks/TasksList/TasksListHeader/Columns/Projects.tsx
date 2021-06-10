import React, { memo } from 'react'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props

  return <Container taskColumnId={taskColumnId} />
})
Projects.displayName = 'Projects'

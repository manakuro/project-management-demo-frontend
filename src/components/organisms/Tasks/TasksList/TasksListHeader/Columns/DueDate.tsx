import React, { memo } from 'react'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const DueDate: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props

  return <Container taskColumnId={taskColumnId} />
})
DueDate.displayName = 'DueDate'

import React, { memo } from 'react'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const TaskName: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props

  return <Container ml={6} taskColumnId={taskColumnId} isFirst />
})
TaskName.displayName = 'TaskName'

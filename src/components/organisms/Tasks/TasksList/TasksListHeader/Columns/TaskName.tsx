import React, { memo } from 'react'
import { useStickyListStyle } from 'src/hooks/styles/useStickyListStyle'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const TaskName: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props
  const { stickyStyle } = useStickyListStyle()

  return (
    <Container ml={6} taskColumnId={taskColumnId} isFirst {...stickyStyle} />
  )
})
TaskName.displayName = 'TaskName'

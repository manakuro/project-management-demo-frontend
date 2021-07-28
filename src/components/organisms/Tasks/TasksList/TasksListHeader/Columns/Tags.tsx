import React, { memo } from 'react'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const Tags: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props

  return <Container clickable taskColumnId={taskColumnId} menu />
})
Tags.displayName = 'Tags'

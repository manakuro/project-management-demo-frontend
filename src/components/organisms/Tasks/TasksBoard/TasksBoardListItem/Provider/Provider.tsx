import React, { memo } from 'react'
import { Provider as TasksBoardListRowProvider } from './TasksBoardListRowProvider'

type Props = {
  taskId: string
}

export const Provider: React.FC<Props> = memo((props) => {
  return <TasksBoardListRowProvider {...props} />
})
Provider.displayName = 'Provider'

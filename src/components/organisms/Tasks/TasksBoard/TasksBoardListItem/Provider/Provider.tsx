import React, { memo } from 'react'
import { Provider as InputProvider } from './InputProvider'
import { Provider as ListItemProvider } from './ListItemProvider'

type Props = {
  taskId: string
}

export const Provider: React.FC<Props> = memo((props) => {
  return (
    <ListItemProvider {...props}>
      <InputProvider {...props}>{props.children}</InputProvider>
    </ListItemProvider>
  )
})
Provider.displayName = 'Provider'
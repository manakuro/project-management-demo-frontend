import React, { memo } from 'react'
import { EditorPlaceholder } from 'src/components/organisms'
import { useInput } from './Provider'

type Props = {}

export const Placeholder: React.FC<Props> = memo<Props>(() => {
  const { focused } = useInput()

  if (focused) return null

  return (
    <EditorPlaceholder ml={2}>
      Ask a question or post an update...
    </EditorPlaceholder>
  )
})
Placeholder.displayName = 'Placeholder'

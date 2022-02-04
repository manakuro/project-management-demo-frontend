import React, { memo } from 'react'
import { EditorPlaceholder } from 'src/components/organisms/Editor'
import { useInputContext } from './Provider'

type Props = {}

export const Placeholder: React.FC<Props> = memo<Props>(() => {
  const { focused, hasTaskFile } = useInputContext()

  if (focused) return null
  if (hasTaskFile) return null

  return (
    <EditorPlaceholder ml={2}>
      Ask a question or post an update...
    </EditorPlaceholder>
  )
})
Placeholder.displayName = 'Placeholder'

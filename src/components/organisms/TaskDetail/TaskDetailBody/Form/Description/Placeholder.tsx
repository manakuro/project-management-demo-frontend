import React, { memo } from 'react'
import { EditorPlaceholder } from 'src/components/organisms'
import { useDescription } from './Provider'

type Props = {}

export const Placeholder: React.FC<Props> = memo<Props>(() => {
  const { focused } = useDescription()

  if (focused) return null

  return (
    <EditorPlaceholder ml={2} mt={2} alignItems="flex-start">
      Add more detail to this task...
    </EditorPlaceholder>
  )
})
Placeholder.displayName = 'Placeholder'

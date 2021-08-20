import React, { memo } from 'react'
import { EditorPlaceholder } from 'src/components/organisms/Editor'
import { useDescriptionContext } from './Provider'

type Props = {}

export const Placeholder: React.FC<Props> = memo<Props>(() => {
  const { focused } = useDescriptionContext()

  if (focused) return null

  return (
    <EditorPlaceholder ml={2} mt={2} alignItems="flex-start">
      Add more detail to this task...
    </EditorPlaceholder>
  )
})
Placeholder.displayName = 'Placeholder'

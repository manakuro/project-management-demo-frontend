import React, { memo } from 'react'
import { EditorPlaceholder } from 'src/components/ui/organisms/Editor'
import { useDescriptionContext } from './Provider'

type Props = {}

export const Placeholder: React.FC<Props> = memo<Props>(() => {
  const { focused } = useDescriptionContext()

  if (focused) return null

  return (
    <EditorPlaceholder alignItems="flex-start">
      Write project details...
    </EditorPlaceholder>
  )
})
Placeholder.displayName = 'Placeholder'

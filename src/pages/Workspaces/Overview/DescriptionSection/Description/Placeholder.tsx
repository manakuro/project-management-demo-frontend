import React, { memo } from 'react'
import { EditorPlaceholder } from 'src/components/organisms/Editor'
import { useDescriptionContext } from './Provider'

type Props = {}

export const Placeholder: React.FC<Props> = memo<Props>(() => {
  const { focused } = useDescriptionContext()

  if (focused) return null

  return (
    <EditorPlaceholder py={1} px={1} alignItems="flex-start">
      Write a workspace details...
    </EditorPlaceholder>
  )
})
Placeholder.displayName = 'Placeholder'

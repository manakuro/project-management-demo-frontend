import React, { memo } from 'react'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors'
import { EmojiAttrs } from 'src/shared/prosemirror/schema'

export const Emoji: React.FC = memo(() => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as EmojiAttrs

  return <>{attrs.emoji}</>
})

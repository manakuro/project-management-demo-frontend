import React, { memo, useCallback } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import {
  useEditorState,
  useEditorView,
} from 'src/components/organisms/Editor/Components/EditorProvider'
import { useStrikethrough } from 'src/shared/prosemirror/hooks'

type Props = {}

export const Strikethrough: React.FC<Props> = memo<Props>((props) => {
  const state = useEditorState()
  const view = useEditorView()
  const { action, isActive } = useStrikethrough()

  const handleClick = useCallback(() => {
    action(state, view.dispatch, view)
  }, [action, state, view])

  return (
    <BaseButton
      aria-label="strikethrough"
      icon={<Icon icon="strikethrough" color="text.muted" />}
      isActive={isActive(state)}
      onClick={handleClick}
      tooltip={{
        label: 'Strikethrough\n(⌘+⇧+S)',
        'aria-label': 'Strikethrough',
      }}
    />
  )
})

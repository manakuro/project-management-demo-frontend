import React, { memo, useCallback } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import {
  useEditorState,
  useEditorView,
} from 'src/components/organisms/Editor/Components/EditorProvider'
import { useItalic } from 'src/shared/prosemirror/hooks'

type Props = {}

export const Italic: React.FC<Props> = memo<Props>(() => {
  const state = useEditorState()
  const view = useEditorView()
  const { action, isActive } = useItalic()

  const handleClick = useCallback(() => {
    action(state, view.dispatch, view)
  }, [action, state, view])

  return (
    <BaseButton
      aria-label="italic"
      icon={<Icon icon="italic" color="text.muted" />}
      isActive={isActive(state)}
      onClick={handleClick}
      tooltip={{
        label: 'Italic\n(⌘+i)',
        'aria-label': 'Italic',
      }}
    />
  )
})

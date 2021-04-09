import React, { memo, useCallback } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import {
  useEditorState,
  useEditorView,
} from 'src/components/organisms/Editor/Components/EditorProvider'
import { useUnderline } from 'src/shared/prosemirror/hooks'

type Props = {}

export const Underline: React.FC<Props> = memo<Props>(() => {
  const state = useEditorState()
  const view = useEditorView()
  const { action, isActive } = useUnderline()

  const handleClick = useCallback(() => {
    action(state, view.dispatch, view)
  }, [action, state, view])

  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="underline" color="text.muted" />}
      isActive={isActive(state)}
      onClick={handleClick}
      tooltip={{
        label: 'Underline\n(⌘+u)',
        'aria-label': 'Underline',
      }}
    />
  )
})

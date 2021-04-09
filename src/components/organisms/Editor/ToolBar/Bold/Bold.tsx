import React, { memo, useCallback } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useBold } from 'src/shared/prosemirror/hooks'
import {
  useEditorState,
  useEditorView,
} from 'src/components/organisms/Editor/Components/EditorProvider'

type Props = {}

export const Bold: React.FC<Props> = memo<Props>(() => {
  const state = useEditorState()
  const view = useEditorView()
  const { action, isActive } = useBold()

  const handleClick = useCallback(() => {
    action(state, view.dispatch, view)
  }, [action, state, view])

  return (
    <BaseButton
      aria-label="bold"
      icon={<Icon icon="bold" color="text.muted" />}
      isActive={isActive(state)}
      onClick={handleClick}
      tooltip={{
        label: 'Bold\n(⌘+b)',
        'aria-label': 'Bold',
      }}
    />
  )
})

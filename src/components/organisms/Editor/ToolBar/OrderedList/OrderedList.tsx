import React, { memo, useCallback } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import {
  useEditorState,
  useEditorView,
} from 'src/components/organisms/Editor/Components/EditorProvider'
import { useOrderedList } from 'src/shared/prosemirror/hooks'

type Props = {}

export const OrderedList: React.FC<Props> = memo<Props>(() => {
  const state = useEditorState()
  const view = useEditorView()
  const { action, isActive } = useOrderedList()

  const handleClick = useCallback(() => {
    action(state, view.dispatch, view)
  }, [action, state, view])

  return (
    <BaseButton
      aria-label="ordered list"
      icon={<Icon icon="listOl" color="text.muted" />}
      isActive={isActive(state)}
      onClick={handleClick}
      tooltip={{
        label: 'Ordered List\n(⌘+⇧+7)',
        'aria-label': 'Ordered List',
      }}
    />
  )
})

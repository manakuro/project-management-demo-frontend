import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useDecreaseListIndent } from 'src/shared/prosemirror/hooks'
import { useEditorState } from 'src/components/organisms/Editor/Components/EditorProvider'

type Props = {}

export const DecreaseListIndent: React.FC<Props> = memo<Props>(() => {
  const state = useEditorState()
  const { action, isActive } = useDecreaseListIndent()

  return (
    <BaseButton
      aria-label="Decrease list indent"
      icon={<Icon icon="leftIndent" color="text.muted" />}
      isDisabled={!isActive(state)}
      action={action}
      tooltip={{
        label: 'Decrease list indent\n(⌘+])',
        'aria-label': 'Decrease list indent',
      }}
    />
  )
})

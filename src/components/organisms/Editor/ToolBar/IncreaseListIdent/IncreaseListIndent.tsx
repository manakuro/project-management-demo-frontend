import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useIncreaseListIndent } from 'src/shared/prosemirror/hooks'
import { useEditorState } from 'src/components/organisms/Editor/Components/EditorProvider'

type Props = {}

export const IncreaseListIndent: React.FC<Props> = memo<Props>(() => {
  const state = useEditorState()
  const { action, isActive } = useIncreaseListIndent()

  return (
    <BaseButton
      aria-label="Increase list indent"
      icon={<Icon icon="rightIndent" color="text.muted" />}
      isDisabled={!isActive(state)}
      action={action}
      tooltip={{
        label: 'Increase list indent\n(⌘+[)',
        'aria-label': 'Increase list indent',
      }}
    />
  )
})

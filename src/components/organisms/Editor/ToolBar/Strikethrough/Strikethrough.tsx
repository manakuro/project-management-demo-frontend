import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useStrikethrough } from 'src/shared/prosemirror/hooks'

type Props = {}

export const Strikethrough: React.FC<Props> = memo<Props>(() => {
  const { action, isActive } = useStrikethrough()
  return (
    <BaseButton
      aria-label="strikethrough"
      icon={<Icon icon="strikethrough" color="text.muted" />}
      isActive={isActive}
      action={action}
      tooltip={{
        label: 'Strikethrough\n(⌘+⇧+S)',
        'aria-label': 'Strikethrough',
      }}
    />
  )
})

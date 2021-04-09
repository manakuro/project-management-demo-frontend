import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useBold } from 'src/shared/prosemirror/hooks'
type Props = {}

export const Bold: React.FC<Props> = memo<Props>(() => {
  const { action, isActive } = useBold()

  return (
    <BaseButton
      aria-label="bold"
      icon={<Icon icon="bold" color="text.muted" />}
      isActive={isActive}
      action={action}
      tooltip={{
        label: 'Bold\n(⌘+b)',
        'aria-label': 'Bold',
      }}
    />
  )
})

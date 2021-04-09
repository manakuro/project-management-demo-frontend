import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useUnderline } from 'src/shared/prosemirror/hooks'

type Props = {}

export const Underline: React.FC<Props> = memo<Props>(() => {
  const { action, isActive } = useUnderline()
  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="underline" color="text.muted" />}
      isActive={isActive}
      action={action}
      tooltip={{
        label: 'Underline\n(⌘+u)',
        'aria-label': 'Underline',
      }}
    />
  )
})

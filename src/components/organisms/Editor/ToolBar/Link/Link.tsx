import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useLink } from 'src/shared/prosemirror/hooks'
type Props = {}

export const Link: React.FC<Props> = memo<Props>(() => {
  const { action, isActive, isEnable } = useLink()

  return (
    <BaseButton
      aria-label="link"
      icon={<Icon icon="link" color="text.muted" />}
      isActive={isActive}
      isEnable={isEnable}
      action={action}
      tooltip={{
        label: 'Link\n(⌘+b)',
        'aria-label': 'Link',
      }}
    />
  )
})

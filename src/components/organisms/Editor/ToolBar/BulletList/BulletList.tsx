import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useBulletList } from 'src/shared/prosemirror/hooks'

type Props = {}

export const BulletList: React.FC<Props> = memo<Props>(() => {
  const { action, isActive } = useBulletList()
  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="listUl" color="text.muted" />}
      isActive={isActive}
      action={action}
      tooltip={{
        label: 'Bullet List\n(⌘+⇧+8)',
        'aria-label': 'Bullet List',
      }}
    />
  )
})

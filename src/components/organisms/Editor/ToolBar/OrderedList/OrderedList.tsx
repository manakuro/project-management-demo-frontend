import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useOrderedList } from 'src/shared/prosemirror/hooks'

type Props = {}

export const OrderedList: React.FC<Props> = memo<Props>(() => {
  const { action, isActive } = useOrderedList()

  return (
    <BaseButton
      aria-label="ordered list"
      icon={<Icon icon="listOl" color="text.muted" />}
      isActive={isActive}
      action={action}
      tooltip={{
        label: 'Ordered List\n(⌘+⇧+7)',
        'aria-label': 'Ordered List',
      }}
    />
  )
})

import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useDecreaseListIndent } from 'src/shared/prosemirror/hooks'

type Props = {}

export const DecreaseListIndent: React.FC<Props> = memo<Props>(() => {
  const { action, isEnable } = useDecreaseListIndent()

  return (
    <BaseButton
      aria-label="Decrease list indent"
      icon={<Icon icon="leftIndent" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      tooltip={{
        label: 'Decrease list indent\n(⌘+])',
        'aria-label': 'Decrease list indent',
      }}
    />
  )
})

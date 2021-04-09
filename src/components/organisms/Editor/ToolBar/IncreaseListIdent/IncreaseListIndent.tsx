import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useIncreaseListIndent } from 'src/shared/prosemirror/hooks'

type Props = {}

export const IncreaseListIndent: React.FC<Props> = memo<Props>(() => {
  const { action, isEnable } = useIncreaseListIndent()

  return (
    <BaseButton
      aria-label="Increase list indent"
      icon={<Icon icon="rightIndent" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      tooltip={{
        label: 'Increase list indent\n(⌘+[)',
        'aria-label': 'Increase list indent',
      }}
    />
  )
})

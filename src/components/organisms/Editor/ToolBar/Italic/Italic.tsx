import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useItalic } from 'src/shared/prosemirror/hooks'

type Props = {}

export const Italic: React.FC<Props> = memo<Props>(() => {
  const { action, isActive } = useItalic()

  return (
    <BaseButton
      aria-label="italic"
      icon={<Icon icon="italic" color="text.muted" />}
      isActive={isActive}
      action={action}
      tooltip={{
        label: 'Italic\n(⌘+i)',
        'aria-label': 'Italic',
      }}
    />
  )
})

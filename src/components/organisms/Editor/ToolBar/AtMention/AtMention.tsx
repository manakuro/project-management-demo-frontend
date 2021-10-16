import React, { memo } from 'react'
import { Icon } from 'src/components/atoms'
import { useAtMention } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

type Props = {}

export const AtMention: React.FC<Props> = memo<Props>(() => {
  const { action } = useAtMention()

  return (
    <BaseButton
      aria-label="At mention"
      icon={<Icon icon="at" color="text.muted" />}
      action={action}
      tooltip={{
        label: 'At-Mention',
        'aria-label': 'At-Mention',
      }}
    />
  )
})
AtMention.displayName = 'AtMention'

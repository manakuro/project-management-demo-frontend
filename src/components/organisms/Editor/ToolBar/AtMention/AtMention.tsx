import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useAtMention } from 'src/shared/prosemirror/hooks'

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

import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { useEmoji } from 'src/shared/prosemirror/hooks'
import { PopoverEmoji } from 'src/components/organisms'

type Props = {}

export const Emoji: React.FC<Props> = memo<Props>(() => {
  const { action } = useEmoji()

  return (
    <PopoverEmoji>
      <BaseButton
        aria-label="emoji"
        icon={<Icon icon="emojiHappy" color="text.muted" />}
        action={action}
        tooltip={{
          label: 'Emoji',
          'aria-label': 'Emoji',
        }}
      />
    </PopoverEmoji>
  )
})

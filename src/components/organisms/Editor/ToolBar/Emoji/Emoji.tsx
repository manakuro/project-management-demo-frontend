import React, { memo } from 'react'
import { Icon } from 'src/components/atoms'
import { PopoverEmoji } from 'src/components/organisms/Popovers'
import { useEmoji } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

type Props = {}

export const Emoji: React.FC<Props> = (props) => {
  return (
    <PopoverEmoji>
      <Component {...props} />
    </PopoverEmoji>
  )
}

export const Component: React.FC<Props> = memo<Props>(() => {
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

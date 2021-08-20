import { BaseEmoji, Picker } from 'emoji-mart'
import React, { memo, useCallback } from 'react'
import { Portal, Box } from 'src/components/atoms'
import { PopoverContent } from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'
import { usePopoverEmojiContext } from './Provider'

import 'emoji-mart/css/emoji-mart.css'

type Props = {}

export const Content: React.FC<Props> = memo<Props>(() => {
  const { onClose } = usePopoverEmojiContext()
  const { ref } = useClickOutside(onClose)

  const handleSelect = useCallback(
    (emoji: BaseEmoji) => {
      onClose(emoji)
    },
    [onClose],
  )

  return (
    <Portal>
      <Box zIndex="popover" w="full" h="full" ref={ref}>
        <PopoverContent boxShadow="none" border="none" w="auto">
          <Picker onSelect={handleSelect} title="manato" />
        </PopoverContent>
      </Box>
    </Portal>
  )
})

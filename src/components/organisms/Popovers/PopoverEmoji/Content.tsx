import React, { memo, useCallback, useEffect } from 'react'
import { PopoverContent } from 'src/components/organisms'
import { Portal, Box } from 'src/components/atoms'
import { usePopoverEmoji } from './usePopoverEmoji'
import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Picker } from 'emoji-mart'
import { useClickOutside } from 'src/hooks'

type Props = {}

export const Content: React.FC<Props> = memo<Props>(() => {
  const { onClose } = usePopoverEmoji()
  const { ref, hasClickedOutside } = useClickOutside()

  const handleSelect = useCallback(
    (emoji: BaseEmoji) => {
      onClose(emoji)
    },
    [onClose],
  )

  useEffect(() => {
    if (hasClickedOutside) {
      onClose()
    }
  }, [hasClickedOutside, onClose])

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

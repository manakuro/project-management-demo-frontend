import React, { useCallback } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/organisms'
import { Portal, Link, Box } from 'src/components/atoms'
import { usePopoverEmoji } from './usePopoverEmoji'
import { PortalManager } from '@chakra-ui/react'
import 'emoji-mart/css/emoji-mart.css'
import { EmojiData, Picker } from 'emoji-mart'

type Props = {}

export const PopoverEmoji: React.FC<Props> = (props) => {
  const usePopoverEmojiResult = usePopoverEmoji()

  const handleSelect = useCallback(
    (emoji: EmojiData) => {
      usePopoverEmojiResult.setEmoji(emoji)
      usePopoverEmojiResult.onClose()
    },
    [usePopoverEmojiResult],
  )

  return (
    <PortalManager zIndex={1500}>
      <Popover
        isOpen={usePopoverEmojiResult.isOpen}
        isLazy
        placement="top-end"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Link>{props.children}</Link>
        </PopoverTrigger>
        <Portal>
          <Box zIndex="popover" w="full" h="full">
            <PopoverContent boxShadow="none" border="none" w="auto">
              <Picker set="apple" onSelect={handleSelect} />
            </PopoverContent>
          </Box>
        </Portal>
      </Popover>
    </PortalManager>
  )
}

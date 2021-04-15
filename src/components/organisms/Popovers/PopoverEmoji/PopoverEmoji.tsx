import React, { useCallback } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/organisms'
import { Portal, Link, Box, ConditionalRender } from 'src/components/atoms'
import { usePopoverEmoji } from './usePopoverEmoji'
import { PortalManager } from '@chakra-ui/react'
import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Picker } from 'emoji-mart'

type Props = {}

export const PopoverEmoji: React.FC<Props> = (props) => {
  const usePopoverEmojiResult = usePopoverEmoji()

  const handleSelect = useCallback(
    (emoji: BaseEmoji) => {
      usePopoverEmojiResult.onClose(emoji)
    },
    [usePopoverEmojiResult],
  )

  return (
    <ConditionalRender client>
      <PortalManager zIndex={1500}>
        <Popover
          isOpen={usePopoverEmojiResult.isOpen}
          placement="top-end"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <Link>{props.children}</Link>
          </PopoverTrigger>
          <Portal>
            <Box zIndex="popover" w="full" h="full">
              <PopoverContent boxShadow="none" border="none" w="auto">
                <Picker onSelect={handleSelect} />
              </PopoverContent>
            </Box>
          </Portal>
        </Popover>
      </PortalManager>
    </ConditionalRender>
  )
}

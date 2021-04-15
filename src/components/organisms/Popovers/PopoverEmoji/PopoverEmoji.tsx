import React from 'react'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/organisms'
import { Portal, Link, Box } from 'src/components/atoms'
import { usePopoverEmoji } from './usePopoverEmoji'
import { PortalManager } from '@chakra-ui/react'

type Props = {}

export const PopoverEmoji: React.FC<Props> = (props) => {
  const usePopoverEmojiResult = usePopoverEmoji()

  return (
    <PortalManager zIndex={1500}>
      <Popover isOpen={usePopoverEmojiResult.isOpen} isLazy placement="top-end">
        <PopoverTrigger>
          <Link>{props.children}</Link>
        </PopoverTrigger>
        <Portal>
          <Box zIndex="popover" w="full" h="full">
            <PopoverContent>
              <PopoverBody boxShadow="md" borderRadius="md">
                hey
              </PopoverBody>
            </PopoverContent>
          </Box>
        </Portal>
      </Popover>
    </PortalManager>
  )
}

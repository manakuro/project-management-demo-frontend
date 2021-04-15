import React from 'react'
import { Popover, PopoverTrigger } from 'src/components/organisms'
import { Link, ConditionalRender } from 'src/components/atoms'
import { usePopoverEmoji } from './usePopoverEmoji'
import { PortalManager } from '@chakra-ui/react'
import 'emoji-mart/css/emoji-mart.css'
import { Content } from './Content'

type Props = {}

export const PopoverEmoji: React.FC<Props> = (props) => {
  const { isOpen } = usePopoverEmoji()

  return (
    <ConditionalRender client>
      <PortalManager zIndex={1500}>
        <Popover isOpen={isOpen} placement="top-end" closeOnBlur={false}>
          <PopoverTrigger>
            <Link>{props.children}</Link>
          </PopoverTrigger>
          {isOpen && <Content />}
        </Popover>
      </PortalManager>
    </ConditionalRender>
  )
}

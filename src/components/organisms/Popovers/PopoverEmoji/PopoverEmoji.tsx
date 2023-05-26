import React from 'react'
import { Popover, PopoverTrigger } from 'src/components/organisms/Popover'
import { ConditionalRender, PortalManager, Flex } from 'src/components/ui/atoms'
import { Content } from './Content'
import { usePopoverEmojiContext } from './Provider'
import { Provider } from './Provider'

type Props = {}

export const PopoverEmoji: React.FCWithChildren<Props> = (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FCWithChildren<Props> = (props) => {
  const { isOpen } = usePopoverEmojiContext()

  return (
    <ConditionalRender client>
      <PortalManager zIndex={1500}>
        <Popover isOpen={isOpen} placement="top-end" closeOnBlur={false}>
          <PopoverTrigger>
            {/*TODO: To fix an issue of duplicated trigger wrapper generated*/}
            <Flex>{props.children}</Flex>
          </PopoverTrigger>
          {isOpen && <Content />}
        </Popover>
      </PortalManager>
    </ConditionalRender>
  )
}

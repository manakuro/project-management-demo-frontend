import React from 'react'
import { Popover, PopoverTrigger } from 'src/components/organisms'
import { ConditionalRender, PortalManager, Flex } from 'src/components/atoms'
import { usePopoverEmoji } from './Provider'
import 'emoji-mart/css/emoji-mart.css'
import { Content } from './Content'
import { Provider } from './Provider'

type Props = {}

export const PopoverEmoji: React.FC<Props> = (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FC<Props> = (props) => {
  const { isOpen } = usePopoverEmoji()

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

import React from 'react'
import { Provider } from './Provider'
import { Flex } from 'src/components/atoms'

type Props = {}

export const Carousel: React.FC<Props> = (props) => {
  return (
    <Provider>
      <Flex flex="1" overflow="hidden" position="relative" height="100%">
        {props.children}
      </Flex>
    </Provider>
  )
}

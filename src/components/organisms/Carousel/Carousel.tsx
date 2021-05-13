import React from 'react'
import { Provider } from './Provider'
import { Flex } from 'src/components/atoms'

type Props = {
  onChange?: (currentIndex: number) => void
}

export const Carousel: React.FC<Props> = (props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FC<Props> = (props) => {
  return (
    <Flex flex="1" overflow="hidden" position="relative" height="100%">
      {props.children}
    </Flex>
  )
}

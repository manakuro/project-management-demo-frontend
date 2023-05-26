import React from 'react'
import { Flex } from 'src/components/ui/atoms'
import { Provider } from './Provider'

type Props = {
  onChange?: (currentIndex: number) => void
  defaultIndex?: number
}

export const Carousel: React.FCWithChildren<Props> = (props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FCWithChildren<Props> = (props) => {
  return (
    <Flex
      flex="1"
      overflow="hidden"
      position="relative"
      height="100%"
      flexDirection="column"
    >
      {props.children}
    </Flex>
  )
}

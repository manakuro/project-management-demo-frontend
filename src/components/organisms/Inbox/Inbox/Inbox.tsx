import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { Provider } from './Provider'

type Props = FlexProps

export const Inbox: React.FC<Props> = memo((props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = forwardRef((props, ref) => (
  <Flex flex={1} h="full" {...props} ref={ref} />
))

Inbox.displayName = 'Inbox'

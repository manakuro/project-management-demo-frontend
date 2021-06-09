import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { Provider } from './Provider'

type Props = FlexProps

export const TasksList: React.FC<Props> = (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FC<Props> = forwardRef((props, ref) => (
  <Flex flex={1} flexDirection="column" {...props} ref={ref} />
))

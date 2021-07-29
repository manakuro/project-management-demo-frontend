import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { Provider } from './Provider'

type Props = FlexProps
type ComponentProps = Omit<Props, 'taskColumnIds'>

export const TasksBoard: React.FC<Props> = (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FC<ComponentProps> = forwardRef((props, ref) => (
  <Flex flex={1} h="full" flexDirection="column" {...props} ref={ref} />
))

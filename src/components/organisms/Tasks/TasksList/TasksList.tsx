import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { Provider } from './Provider'

type Props = FlexProps & {
  taskColumnIds: string[]
}
type ComponentProps = Omit<Props, 'taskColumnIds'>

export const TasksList: React.FC<Props> = (props) => {
  const { taskColumnIds, ...rest } = props
  return (
    <Provider taskColumnIds={taskColumnIds}>
      <Component {...rest} />
    </Provider>
  )
}

const Component: React.FC<ComponentProps> = forwardRef((props, ref) => (
  <Flex flex={1} flexDirection="column" {...props} ref={ref} />
))

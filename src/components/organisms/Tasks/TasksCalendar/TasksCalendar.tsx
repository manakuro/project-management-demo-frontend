import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'
import { Provider } from './Provider'

type Props = FlexProps
type ComponentProps = Omit<Props, 'taskColumnIds'>

export const TasksCalendar: React.FC<Props> = memo((props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<ComponentProps> = forwardRef((props, ref) => (
  <Flex flex={1} h="full" flexDirection="column" {...props} ref={ref} />
))

TasksCalendar.displayName = 'TasksCalendar'

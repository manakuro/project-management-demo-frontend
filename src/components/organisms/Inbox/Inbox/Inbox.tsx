import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { forwardRef } from 'src/shared/chakra'
import { InboxProviderProps, Provider } from './Provider'

type Props = FlexProps & InboxProviderProps

export const Inbox: React.FC<Props> = memo<Props>((props) => {
  const { isActivity, isArchive, ...rest } = props
  return (
    <Provider isActivity={isActivity} isArchive={isArchive}>
      <Component {...rest} />
    </Provider>
  )
})

const Component: React.FC<Props> = forwardRef((props, ref) => (
  <Flex flex={1} h="full" {...props} ref={ref} />
))

Inbox.displayName = 'Inbox'

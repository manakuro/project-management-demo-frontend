import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMainStyle } from 'src/hooks'

type Props = FlexProps

export const InboxHeader: React.FC<Props> = memo<Props>((props) => {
  const { paddingX } = useMainStyle()

  return (
    <Flex
      flex={1}
      maxH="57px"
      px={paddingX}
      py={4}
      bg="white"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.200"
      {...props}
    />
  )
})
InboxHeader.displayName = 'InboxHeader'

import React from 'react'
import { Flex } from 'src/components/atoms/Flex'

type Props = React.ComponentProps<typeof Flex>

export const Inner: React.FC<Props> = (props) => {
  return (
    <Flex
      flex="1"
      flexDirection="column"
      maxW="1180px"
      w="full"
      m="0 auto"
      {...props}
    />
  )
}

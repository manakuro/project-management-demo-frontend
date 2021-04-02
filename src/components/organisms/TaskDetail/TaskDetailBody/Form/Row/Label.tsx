import React from 'react'
import { Flex, FlexProps, Text } from 'src/components/atoms'

type Props = FlexProps

export const Label: React.FC<Props> = (props) => {
  return (
    <Flex alignItems="center" w="100px" {...props}>
      <Text fontSize="xs" color="text.muted">
        {props.children}
      </Text>
    </Flex>
  )
}

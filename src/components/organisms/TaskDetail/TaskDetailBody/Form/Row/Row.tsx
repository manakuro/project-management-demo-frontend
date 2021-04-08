import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

export const Row: React.FC<Props> = (props) => {
  return (
    <Flex minH={9} {...props}>
      {props.children}
    </Flex>
  )
}

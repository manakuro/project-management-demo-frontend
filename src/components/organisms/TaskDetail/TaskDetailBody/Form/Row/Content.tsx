import React from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps

export const Content: React.FC<Props> = (props) => {
  return (
    <Flex alignItems="center" flex={1} {...props}>
      {props.children}
    </Flex>
  )
}

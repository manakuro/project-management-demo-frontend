import React from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms/Flex'

type Props = FlexProps

export const Container: React.FCWithChildren<Props> = (props) => {
  return <Flex p={4} {...props} />
}

import React from 'react'
import {
  Flex as ChakraFlex,
  FlexProps as ChakraFlexProps,
} from '@chakra-ui/react'

type Props = ChakraFlexProps
export type FlexProps = Props

export const Flex: React.FC<Props> = (props) => {
  return <ChakraFlex {...props} />
}

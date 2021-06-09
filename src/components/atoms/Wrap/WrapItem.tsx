import {
  WrapItem as ChakraWrapItem,
  WrapItemProps as ChakraWrapItemProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraWrapItemProps
export type WrapItemProps = Props

export const WrapItem: React.FC<Props> = (props) => {
  return <ChakraWrapItem {...props} />
}

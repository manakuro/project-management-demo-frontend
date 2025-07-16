import {
  WrapItem as ChakraWrapItem,
  type WrapItemProps as ChakraWrapItemProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraWrapItemProps
export type WrapItemProps = Props

export const WrapItem: React.FC<Props> = (props) => {
  return <ChakraWrapItem {...props} />
}

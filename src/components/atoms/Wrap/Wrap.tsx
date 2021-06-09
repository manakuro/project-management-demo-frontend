import {
  Wrap as ChakraWrap,
  WrapProps as ChakraWrapProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraWrapProps
export type WrapProps = Props

export const Wrap: React.FC<Props> = (props) => {
  return <ChakraWrap {...props} />
}

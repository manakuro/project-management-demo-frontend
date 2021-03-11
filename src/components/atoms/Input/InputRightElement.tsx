import React from 'react'
import {
  InputRightElement as ChakraInputRightElement,
  InputElementProps as ChakraInputRightElementProps,
} from '@chakra-ui/react'

type Props = ChakraInputRightElementProps
export type InputRightElementProps = Props

export const InputRightElement: React.FC<Props> = (props) => {
  return <ChakraInputRightElement {...props} />
}

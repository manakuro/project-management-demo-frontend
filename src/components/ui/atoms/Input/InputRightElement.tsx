import {
  InputRightElement as ChakraInputRightElement,
  type InputElementProps as ChakraInputRightElementProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraInputRightElementProps
export type InputRightElementProps = Props

export const InputRightElement: React.FC<Props> = (props) => {
  return <ChakraInputRightElement {...props} />
}

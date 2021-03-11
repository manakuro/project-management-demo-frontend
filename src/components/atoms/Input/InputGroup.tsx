import React from 'react'
import {
  InputGroup as ChakraInputGroup,
  InputGroupProps as ChakraInputGroupProps,
} from '@chakra-ui/react'

type Props = ChakraInputGroupProps
export type InputGroupProps = Props

export const InputGroup: React.FC<Props> = (props) => {
  return <ChakraInputGroup {...props} />
}

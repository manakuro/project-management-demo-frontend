import {
  Stack as ChakraStack,
  StackProps as ChakraStackProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraStackProps
export type StackProps = Props

export const Stack: React.FC<Props> = (props) => {
  return <ChakraStack {...props} />
}

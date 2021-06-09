import { Stack as ChakraStack, StackProps } from '@chakra-ui/react'
import React from 'react'

type Props = StackProps

export const Stack: React.FC<Props> = (props) => {
  return <ChakraStack {...props} />
}

import React from 'react'
import { Box as ChakraBox, BoxProps } from '@chakra-ui/react'

type Props = BoxProps

export const Box: React.FC<Props> = (props) => {
  return <ChakraBox {...props} />
}

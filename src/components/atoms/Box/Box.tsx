import React from 'react'
import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react'

type Props = ChakraBoxProps
export type BoxProps = Props

export const Box: React.FC<Props> = (props) => {
  return <ChakraBox {...props} />
}

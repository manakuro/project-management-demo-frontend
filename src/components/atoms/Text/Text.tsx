import React from 'react'
import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from '@chakra-ui/react'

type Props = ChakraTextProps
export type TextProps = Props

export const Text: React.FC<Props> = (props) => {
  return <ChakraText {...props} />
}

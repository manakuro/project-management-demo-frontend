import React from 'react'
import { Text as ChakraText, TextProps } from '@chakra-ui/react'

type Props = TextProps

export const Text: React.FC<Props> = (props) => {
  return <ChakraText {...props} />
}

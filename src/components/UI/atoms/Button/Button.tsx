import React from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'

type Props = ButtonProps

export const Button: React.FC<Props> = (props) => {
  return <ChakraButton {...props} fontWeight="normal" />
}

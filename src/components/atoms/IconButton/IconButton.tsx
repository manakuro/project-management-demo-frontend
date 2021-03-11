import React from 'react'
import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react'

type Props = ChakraIconButtonProps
export type IconButtonProps = Props

export const IconButton: React.FC<Props> = (props) => {
  return <ChakraIconButton {...props} />
}

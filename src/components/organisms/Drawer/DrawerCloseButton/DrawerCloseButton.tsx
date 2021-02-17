import React from 'react'
import {
  DrawerCloseButton as ChakraDrawerCloseButton,
  CloseButtonProps as ChakraCloseButtonProps,
} from '@chakra-ui/react'

type Props = ChakraCloseButtonProps
export type DrawerCloseButtonProps = Props

export const DrawerCloseButton: React.FC<Props> = (props) => {
  return <ChakraDrawerCloseButton {...props} />
}

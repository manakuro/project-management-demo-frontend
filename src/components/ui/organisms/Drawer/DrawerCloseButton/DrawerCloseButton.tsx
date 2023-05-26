import {
  DrawerCloseButton as ChakraDrawerCloseButton,
  CloseButtonProps as ChakraCloseButtonProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraCloseButtonProps
export type DrawerCloseButtonProps = Props

export const DrawerCloseButton: React.FC<Props> = (props) => {
  return <ChakraDrawerCloseButton {...props} />
}

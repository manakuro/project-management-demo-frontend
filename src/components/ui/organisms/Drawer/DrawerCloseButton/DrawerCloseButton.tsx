import {
  type CloseButtonProps as ChakraCloseButtonProps,
  DrawerCloseButton as ChakraDrawerCloseButton,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraCloseButtonProps
export type DrawerCloseButtonProps = Props

export const DrawerCloseButton: React.FC<Props> = (props) => {
  return <ChakraDrawerCloseButton {...props} />
}

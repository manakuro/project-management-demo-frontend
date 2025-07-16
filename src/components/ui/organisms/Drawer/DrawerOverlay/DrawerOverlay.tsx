import {
  DrawerOverlay as ChakraDrawerOverlay,
  type ModalOverlayProps as ChakraModalOverlayProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraModalOverlayProps
export type DrawerOverlayProps = Props

export const DrawerOverlay: React.FC<Props> = (props) => {
  return <ChakraDrawerOverlay {...props} />
}

import {
  DrawerOverlay as ChakraDrawerOverlay,
  ModalOverlayProps as ChakraModalOverlayProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraModalOverlayProps
export type DrawerOverlayProps = Props

export const DrawerOverlay: React.FC<Props> = (props) => {
  return <ChakraDrawerOverlay {...props} />
}

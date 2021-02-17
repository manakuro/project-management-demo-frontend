import React from 'react'
import {
  DrawerOverlay as ChakraDrawerOverlay,
  ModalOverlayProps as ChakraModalOverlayProps,
} from '@chakra-ui/react'

type Props = ChakraModalOverlayProps
export type DrawerOverlayProps = Props

export const DrawerOverlay: React.FC<Props> = (props) => {
  return <ChakraDrawerOverlay {...props} />
}

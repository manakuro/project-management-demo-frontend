import {
  ModalOverlay as ChakraModalOverlay,
  ModalOverlayProps as ChakraModalOverlayProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraModalOverlayProps
export type ModalOverlayProps = Props

export const ModalOverlay: React.FC<Props> = (props) => {
  return <ChakraModalOverlay {...props} />
}

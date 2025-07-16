import {
  ModalOverlay as ChakraModalOverlay,
  type ModalOverlayProps as ChakraModalOverlayProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraModalOverlayProps
export type ModalOverlayProps = Props

export const ModalOverlay: React.FC<Props> = (props) => {
  return <ChakraModalOverlay {...props} />
}

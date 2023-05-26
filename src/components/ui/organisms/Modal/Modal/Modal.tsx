import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraModalProps
export type ModalProps = Props

export const Modal: React.FC<Props> = (props) => {
  return <ChakraModal {...props} />
}

import React from 'react'
import {
  ModalContent as ChakraModalContent,
  ModalContentProps as ChakraModalContentProps,
} from '@chakra-ui/react'

type Props = ChakraModalContentProps
export type ModalContentProps = Props

export const ModalContent: React.FC<Props> = (props) => {
  return <ChakraModalContent {...props} />
}

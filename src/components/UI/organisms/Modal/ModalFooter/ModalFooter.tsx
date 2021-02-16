import React from 'react'
import {
  ModalFooter as ChakraModalFooter,
  ModalFooterProps as ChakraModalFooterProps,
} from '@chakra-ui/react'

type Props = ChakraModalFooterProps
export type ModalFooterProps = Props

export const ModalFooter: React.FC<Props> = (props) => {
  return <ChakraModalFooter {...props} />
}

import {
  ModalFooter as ChakraModalFooter,
  ModalFooterProps as ChakraModalFooterProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraModalFooterProps
export type ModalFooterProps = Props

export const ModalFooter: React.FC<Props> = (props) => {
  return <ChakraModalFooter {...props} />
}

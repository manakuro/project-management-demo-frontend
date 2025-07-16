import {
  ModalFooter as ChakraModalFooter,
  type ModalFooterProps as ChakraModalFooterProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraModalFooterProps
export type ModalFooterProps = Props

export const ModalFooter: React.FC<Props> = (props) => {
  return <ChakraModalFooter {...props} />
}

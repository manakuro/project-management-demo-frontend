import React from 'react'
import {
  ModalBody as ChakraModalBody,
  ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react'

type Props = ChakraModalBodyProps
export type ModalBodyProps = Props

export const ModalBody: React.FC<Props> = (props) => {
  return <ChakraModalBody {...props} />
}

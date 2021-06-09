import {
  ModalHeader as ChakraModalHeader,
  ModalHeaderProps as ChakraModalHeaderProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraModalHeaderProps
export type ModalHeaderProps = Props

export const ModalHeader: React.FC<Props> = (props) => {
  return <ChakraModalHeader {...props} />
}

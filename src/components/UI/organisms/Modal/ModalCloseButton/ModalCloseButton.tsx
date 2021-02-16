import React from 'react'
import { ModalCloseButton as ChakraModalCloseButton } from '@chakra-ui/react'

type Props = {}
export type ModalCloseButtonProps = Props

export const ModalCloseButton: React.FC<Props> = (props) => {
  return <ChakraModalCloseButton {...props} />
}

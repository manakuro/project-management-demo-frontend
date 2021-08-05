import { ModalCloseButton as ChakraModalCloseButton } from '@chakra-ui/react'
import React from 'react'

type Props = {}
export type ModalCloseButtonProps = Props

export const ModalCloseButton: React.FC<Props> = (props) => {
  return <ChakraModalCloseButton {...props} top={3} />
}

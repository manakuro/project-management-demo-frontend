import React from 'react'
import {
  DrawerFooter as ChakraDrawerFooter,
  ModalFooterProps as ChakraModalFooterProps,
} from '@chakra-ui/react'

type Props = ChakraModalFooterProps
export type DrawerFooterProps = Props

export const DrawerFooter: React.FC<Props> = (props) => {
  return <ChakraDrawerFooter {...props} />
}

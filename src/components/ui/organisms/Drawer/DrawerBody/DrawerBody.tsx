import {
  DrawerBody as ChakraDrawerBody,
  ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraModalBodyProps
export type DrawerBodyProps = Props

export const DrawerBody: React.FC<Props> = (props) => {
  return <ChakraDrawerBody {...props} />
}

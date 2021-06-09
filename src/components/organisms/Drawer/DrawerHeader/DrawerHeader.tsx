import {
  DrawerHeader as ChakraDrawerHeader,
  ModalHeaderProps as ChakraModalHeaderProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraModalHeaderProps
export type DrawerHeaderProps = Props

export const DrawerHeader: React.FC<Props> = (props) => {
  return <ChakraDrawerHeader {...props} />
}

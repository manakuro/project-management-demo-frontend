import {
  Drawer as ChakraDrawer,
  DrawerProps as ChakraDrawerProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraDrawerProps
export type DrawerProps = Props

export const Drawer: React.FC<Props> = (props) => {
  return <ChakraDrawer {...props} />
}

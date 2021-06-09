import {
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraMenuProps
export type MenuProps = Props

export const Menu: React.FC<Props> = (props) => {
  return <ChakraMenu isLazy lazyBehavior="keepMounted" {...props} />
}

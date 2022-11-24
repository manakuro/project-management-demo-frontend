import {
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
} from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<ChakraMenuProps>
export type MenuProps = Props

export const Menu: React.FC<Props> = (props) => {
  return <ChakraMenu isLazy lazyBehavior="keepMounted" {...props} />
}

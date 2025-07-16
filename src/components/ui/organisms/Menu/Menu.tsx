import {
  Menu as ChakraMenu,
  type MenuProps as ChakraMenuProps,
} from '@chakra-ui/react'
import type React from 'react'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<ChakraMenuProps>
export type MenuProps = Props

export const Menu: React.FC<Props> = (props) => {
  return <ChakraMenu isLazy lazyBehavior="keepMounted" {...props} />
}

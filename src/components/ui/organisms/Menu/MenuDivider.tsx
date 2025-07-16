import {
  MenuDivider as ChakraMenuDivider,
  type MenuDividerProps as ChakraMenuDividerProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraMenuDividerProps
export type MenuDividerProps = Props

export const MenuDivider: React.FC<Props> = (props) => {
  return <ChakraMenuDivider {...props} />
}

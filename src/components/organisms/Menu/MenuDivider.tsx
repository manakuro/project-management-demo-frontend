import React from 'react'
import {
  MenuDivider as ChakraMenuDivider,
  MenuDividerProps as ChakraMenuDividerProps,
} from '@chakra-ui/react'

type Props = ChakraMenuDividerProps
export type MenuDividerProps = Props

export const MenuDivider: React.FC<Props> = (props) => {
  return <ChakraMenuDivider {...props} />
}

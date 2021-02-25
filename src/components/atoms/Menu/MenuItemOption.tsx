import React from 'react'
import {
  MenuItemOption as ChakraMenuItemOption,
  MenuItemOptionProps as ChakraMenuItemOptionProps,
} from '@chakra-ui/react'

type Props = ChakraMenuItemOptionProps
export type MenuItemOptionProps = Props

export const MenuItemOption: React.FC<Props> = (props) => {
  return <ChakraMenuItemOption {...props} />
}

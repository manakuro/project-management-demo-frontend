import {
  MenuItemOption as ChakraMenuItemOption,
  MenuItemOptionProps as ChakraMenuItemOptionProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraMenuItemOptionProps
export type MenuItemOptionProps = Props

export const MenuItemOption: React.FC<Props> & {
  id?: string
} = forwardRef((props, ref) => (
  <ChakraMenuItemOption fontSize="sm" {...props} ref={ref} />
))

MenuItemOption.id = 'MenuItemOption'

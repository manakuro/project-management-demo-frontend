import React from 'react'
import {
  MenuList as ChakraMenuList,
  MenuListProps as ChakraMenuListProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraMenuListProps & {
  ref?: React.MutableRefObject<any>
}
export type MenuListProps = Props

export const MenuList: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraMenuList {...props} ref={ref} aria-label="menu-list" />
))

import React from 'react'
import {
  MenuList as ChakraMenuList,
  MenuListProps as ChakraMenuListProps,
} from '@chakra-ui/react'

type Props = ChakraMenuListProps
export type MenuListProps = Props

export const MenuList: React.FC<Props> = (props) => {
  return <ChakraMenuList {...props} />
}

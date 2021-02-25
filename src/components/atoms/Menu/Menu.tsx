import React from 'react'
import {
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
} from '@chakra-ui/react'

type Props = ChakraMenuProps
export type MenuProps = Props

export const Menu: React.FC<Props> = (props) => {
  return <ChakraMenu {...props} />
}

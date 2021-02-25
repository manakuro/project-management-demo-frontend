import React from 'react'
import {
  MenuButton as ChakraMenuButton,
  MenuButtonProps as ChakraMenuButtonProps,
} from '@chakra-ui/react'

type Props = ChakraMenuButtonProps
export type MenuButtonProps = Props

export const MenuButton: React.FC<Props> = (props) => {
  return <ChakraMenuButton {...props} />
}

import {
  MenuButton as ChakraMenuButton,
  MenuButtonProps as ChakraMenuButtonProps,
} from '@chakra-ui/react'
import React from 'react'
import { Box } from 'src/components/atoms'

type Props = ChakraMenuButtonProps &
  React.ComponentProps<typeof ChakraMenuButton>
export type MenuButtonProps = Props

export const MenuButton: React.FC<Props> = (props) => {
  return <ChakraMenuButton as={Box} {...props} />
}

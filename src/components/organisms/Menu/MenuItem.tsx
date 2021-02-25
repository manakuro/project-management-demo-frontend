import React from 'react'
import {
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
} from '@chakra-ui/react'

type Props = ChakraMenuItemProps
export type MenuItemProps = Props

export const MenuItem: React.FC<Props> = (props) => {
  return <ChakraMenuItem {...props} />
}

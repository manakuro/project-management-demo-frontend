import React from 'react'
import { MenuIcon as ChakraMenuIcon } from '@chakra-ui/react'

type Props = {}
export type MenuIconProps = Props

export const MenuIcon: React.FC<Props> = (props) => {
  return <ChakraMenuIcon {...props} />
}

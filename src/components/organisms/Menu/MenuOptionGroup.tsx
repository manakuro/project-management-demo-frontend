import {
  MenuOptionGroup as ChakraMenuOptionGroup,
  MenuOptionGroupProps as ChakraMenuOptionGroupProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraMenuOptionGroupProps
export type MenuOptionGroupProps = Props

export const MenuOptionGroup: React.FC<Props> & { id?: string } = (props) => {
  return <ChakraMenuOptionGroup {...props} />
}

MenuOptionGroup.id = 'MenuOptionGroup'

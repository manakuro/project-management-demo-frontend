import React from 'react'
import {
  MenuOptionGroup as ChakraMenuOptionGroup,
  MenuOptionGroupProps as ChakraMenuOptionGroupProps,
} from '@chakra-ui/react'

type Props = ChakraMenuOptionGroupProps
export type MenuOptionGroupProps = Props

export const MenuOptionGroup: React.FC<Props> = (props) => {
  return <ChakraMenuOptionGroup {...props} />
}

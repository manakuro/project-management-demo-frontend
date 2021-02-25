import React from 'react'
import {
  MenuCommand as ChakraMenuCommand,
  MenuCommandProps as ChakraMenuCommandProps,
} from '@chakra-ui/react'

type Props = ChakraMenuCommandProps
export type MenuCommandProps = Props

export const MenuCommand: React.FC<Props> = (props) => {
  return <ChakraMenuCommand {...props} />
}

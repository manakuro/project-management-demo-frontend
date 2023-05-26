import {
  MenuCommand as ChakraMenuCommand,
  MenuCommandProps as ChakraMenuCommandProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraMenuCommandProps
export type MenuCommandProps = Props

export const MenuCommand: React.FC<Props> = (props) => {
  return <ChakraMenuCommand {...props} />
}

import {
  DrawerHeader as ChakraDrawerHeader,
  type ModalHeaderProps as ChakraModalHeaderProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraModalHeaderProps
export type DrawerHeaderProps = Props

export const DrawerHeader: React.FC<Props> = (props) => {
  return <ChakraDrawerHeader {...props} />
}

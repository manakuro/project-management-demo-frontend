import React from 'react'
import {
  DrawerContent as ChakraDrawerContent,
  DrawerContentProps as ChakraDrawerContentProps,
} from '@chakra-ui/react'

type Props = ChakraDrawerContentProps
export type DrawerContentProps = Props

export const DrawerContent: React.FC<Props> = (props) => {
  return <ChakraDrawerContent {...props} />
}

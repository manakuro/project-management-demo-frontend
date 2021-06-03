import React from 'react'
import {
  DrawerContent as ChakraDrawerContent,
  DrawerContentProps as ChakraDrawerContentProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraDrawerContentProps & {
  ref?: React.MutableRefObject<any>
}
export type DrawerContentProps = Props

export const DrawerContent: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraDrawerContent {...props} ref={ref} />
))

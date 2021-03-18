import React, { forwardRef } from 'react'
import {
  Flex as ChakraFlex,
  FlexProps as ChakraFlexProps,
} from '@chakra-ui/react'

type Props = ChakraFlexProps & {
  ref?: React.ForwardedRef<any>
}
export type FlexProps = Props

export const Flex: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraFlex {...props} ref={ref} />
))

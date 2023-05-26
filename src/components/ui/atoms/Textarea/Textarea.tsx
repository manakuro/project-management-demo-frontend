import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTextareaProps & {
  ref?: React.ForwardedRef<any>
}
export type TextareaProps = Props

export const Textarea: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTextarea {...props} focusBorderColor="none" ref={ref} />
))

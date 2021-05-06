import React from 'react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraInputProps & {
  ref?: React.MutableRefObject<any>
}
export type InputProps = Props

export const Input: React.FC<Props> & { id?: string } = forwardRef<
  InputProps,
  'input'
>((props, ref) => <ChakraInput focusBorderColor="none" ref={ref} {...props} />)

// NOTE: Need an id to work styling properly
// @see https://github.com/chakra-ui/chakra-ui/issues/2269
Input.id = 'Input'

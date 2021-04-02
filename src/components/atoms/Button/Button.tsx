import React from 'react'
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraButtonProps & {
  ref?: React.MutableRefObject<any>
}
export type ButtonProps = Props

export const Button: React.FC<Props> & {
  id?: string
} = forwardRef((props, ref) => (
  <ChakraButton
    minH={7}
    iconSpacing={1}
    fontWeight="normal"
    {...props}
    ref={ref}
  />
))

Button.id = 'Button'

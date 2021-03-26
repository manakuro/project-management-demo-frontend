import React from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ButtonProps

export const Button: React.FC<Props> & {
  id?: string
} = forwardRef((props, ref) => (
  <ChakraButton iconSpacing={1} {...props} fontWeight="normal" ref={ref} />
))

Button.id = 'Button'

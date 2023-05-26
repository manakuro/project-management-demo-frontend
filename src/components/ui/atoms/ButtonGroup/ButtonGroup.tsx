import {
  ButtonGroup as ChakraButtonGroup,
  ButtonGroupProps as ChakraButtonGroupProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraButtonGroupProps & {
  ref?: React.MutableRefObject<any>
}
export type ButtonGroupProps = ChakraButtonGroupProps

export const ButtonGroup: React.FC<Props> & {
  id?: string
} = forwardRef((props, ref) => (
  <ChakraButtonGroup {...props} fontWeight="normal" ref={ref} />
))

ButtonGroup.id = 'ButtonGroup'

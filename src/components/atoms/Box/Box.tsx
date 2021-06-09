import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react'
import React from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraBoxProps & {
  ref?: React.ForwardedRef<any> | DraggableProvided['innerRef']
}
export type BoxProps = Props

export const Box: React.FC<Props> = forwardRef<Props, 'div'>((props, ref) => (
  <ChakraBox {...props} ref={ref} />
))

import React from 'react'
import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraBoxProps
export type BoxProps = Props

export const Box: React.FC<Props> = forwardRef<Props, 'div'>((props, ref) => (
  <ChakraBox {...props} ref={ref} />
))

import React from 'react'
import {
  InputLeftElement as ChakraInputLeftElement,
  InputElementProps as ChakraInputLeftElementProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraInputLeftElementProps
export type InputLeftElementProps = Props

export const InputLeftElement: React.FC<Props> & { id?: string } = forwardRef<
  Props,
  'div'
>((props, ref) => <ChakraInputLeftElement {...props} ref={ref} />)

InputLeftElement.id = 'InputLeftElement'

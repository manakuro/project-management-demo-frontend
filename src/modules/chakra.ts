import {
  chakra as ChakraUIChakra,
  ChakraProps as ChakraUIChakraProps,
} from '@chakra-ui/react'
import { Token } from '@chakra-ui/styled-system/dist/types/utils'
import * as CSS from 'csstype'

export type ChakraProps = ChakraUIChakraProps

export const chakra = (
  component: Parameters<typeof ChakraUIChakra>[0],
  options?: Parameters<typeof ChakraUIChakra>[1],
) => {
  return ChakraUIChakra(component, options)
}

export type Colors = Token<CSS.Property.Color, 'colors'>

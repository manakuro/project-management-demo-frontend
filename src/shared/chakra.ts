import {
  chakra as ChakraUIChakra,
  ChakraProps as ChakraUIChakraProps,
  forwardRef as ChakraForwardRef,
  useDisclosure as ChakraUseDisclosure,
} from '@chakra-ui/react'
import { Token } from '@chakra-ui/styled-system/dist/types/utils'
import * as CSS from 'csstype'

export type ChakraProps = ChakraUIChakraProps
export const chakra = ChakraUIChakra
export const forwardRef = ChakraForwardRef
export const useDisclosure = ChakraUseDisclosure
export type Colors = Token<CSS.Property.Color, 'colors'>

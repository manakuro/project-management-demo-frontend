import {
  chakra as ChakraUIChakra,
  ChakraProps as ChakraUIChakraProps,
  forwardRef as ChakraForwardRef,
  useDisclosure as ChakraUseDisclosure,
  useStyleConfig as ChakraUseStyleConfig,
  useBreakpointValue as ChakraUseBreakpointValue,
  SystemProps,
} from '@chakra-ui/react'

export type ChakraProps = ChakraUIChakraProps
export const chakra = ChakraUIChakra
export const forwardRef = ChakraForwardRef
export const useDisclosure = ChakraUseDisclosure
export const useStyleConfig = ChakraUseStyleConfig
export const useBreakpointValue = ChakraUseBreakpointValue
export type Colors = SystemProps['color']

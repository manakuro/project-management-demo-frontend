import {
  chakra as ChakraUIChakra,
  ChakraProps as ChakraUIChakraProps,
} from '@chakra-ui/react'

export type ChakraProps = ChakraUIChakraProps

export const chakra = (
  component: Parameters<typeof ChakraUIChakra>[0],
  options?: Parameters<typeof ChakraUIChakra>[1],
) => {
  return ChakraUIChakra(component, options)
}

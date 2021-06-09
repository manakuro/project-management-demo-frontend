import {
  Center as ChakraCenter,
  CenterProps as ChakraCenterProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraCenterProps
export type CenterProps = Props

export const Center: React.FC<Props> = (props) => {
  return <ChakraCenter {...props} />
}

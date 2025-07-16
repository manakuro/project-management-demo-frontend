import {
  Center as ChakraCenter,
  type CenterProps as ChakraCenterProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraCenterProps
export type CenterProps = Props

export const Center: React.FC<Props> = (props) => {
  return <ChakraCenter {...props} />
}

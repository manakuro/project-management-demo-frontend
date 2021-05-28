import React from 'react'
import {
  Progress as ChakraProgress,
  ProgressProps as ChakraProgressProps,
} from '@chakra-ui/react'

type Props = ChakraProgressProps
export type ProgressProps = Props

export const Progress: React.FC<Props> = (props) => {
  return <ChakraProgress borderRadius="md" {...props} />
}

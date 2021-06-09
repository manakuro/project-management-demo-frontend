import {
  Spinner as ChakraSpinner,
  SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraSpinnerProps
export type SpinnerProps = Props

export const Spinner: React.FC<Props> = (props) => {
  return <ChakraSpinner {...props} />
}

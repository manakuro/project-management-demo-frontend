import {
  Spinner as ChakraSpinner,
  type SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraSpinnerProps
export type SpinnerProps = Props

export const Spinner: React.FC<Props> = (props) => {
  return <ChakraSpinner {...props} />
}

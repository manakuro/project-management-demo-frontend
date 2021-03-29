import React from 'react'
import {
  FormErrorMessage as ChakraFormErrorMessage,
  FormErrorMessageProps as ChakraFormErrorMessageProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraFormErrorMessageProps
export type FormErrorMessageProps = Props

export const FormErrorMessage: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraFormErrorMessage {...props} ref={ref} />,
)

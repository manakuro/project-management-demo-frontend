import React from 'react'
import {
  FormLabel as ChakraFormLabel,
  FormLabelProps as ChakraFormLabelProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraFormLabelProps
export type FormLabelProps = Props

export const FormLabel: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraFormLabel {...props} ref={ref} />,
)

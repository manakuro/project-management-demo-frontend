import {
  FormLabel as ChakraFormLabel,
  type FormLabelProps as ChakraFormLabelProps,
} from '@chakra-ui/react'
import type React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraFormLabelProps
export type FormLabelProps = Props

export const FormLabel: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraFormLabel {...props} ref={ref} />,
)

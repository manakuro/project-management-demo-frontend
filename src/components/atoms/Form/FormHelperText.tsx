import {
  FormHelperText as ChakraFormHelperText,
  HelpTextProps as ChakraHelpTextProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraHelpTextProps
export type FormHelperTextProps = Props

export const FormHelperText: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraFormHelperText {...props} ref={ref} />,
)

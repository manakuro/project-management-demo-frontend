import React from 'react'
import {
  Thead as ChakraThead,
  TableHeadProps as ChakraTheadProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTheadProps
export type TheadProps = Props

export const Thead: React.FC<Props> = forwardRef<Props, 'thead'>(
  (props, ref) => <ChakraThead {...props} ref={ref} />,
)

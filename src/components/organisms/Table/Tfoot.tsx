import React from 'react'
import {
  Tfoot as ChakraTfoot,
  TableFooterProps as ChakraTfootProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTfootProps
export type TfootProps = Props

export const Tfoot: React.FC<Props> = forwardRef<Props, 'tfoot'>(
  (props, ref) => <ChakraTfoot {...props} ref={ref} />,
)

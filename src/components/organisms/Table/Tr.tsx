import React from 'react'
import {
  Tr as ChakraTr,
  TableRowProps as ChakraTrProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTrProps
export type TrProps = Props

export const Tr: React.FC<Props> = forwardRef<Props, 'tr'>((props, ref) => (
  <ChakraTr {...props} ref={ref} />
))

import React from 'react'
import {
  Th as ChakraTh,
  TableColumnHeaderProps as ChakraThProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraThProps & {
  ref?: React.MutableRefObject<any>
}
export type ThProps = Props

export const Th: React.FC<Props> = forwardRef<Props, 'th'>((props, ref) => (
  <ChakraTh {...props} ref={ref} />
))

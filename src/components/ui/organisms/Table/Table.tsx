import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTableProps
export type TableProps = Props

export const Table: React.FC<Props> = forwardRef<Props, 'table'>(
  (props, ref) => <ChakraTable {...props} ref={ref} />,
)

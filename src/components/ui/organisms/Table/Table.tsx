import {
  Table as ChakraTable,
  type TableProps as ChakraTableProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraTableProps;
export type TableProps = Props;

export const Table: React.FC<Props> = forwardRef<Props, 'table'>(
  (props, ref) => <ChakraTable {...props} ref={ref} />,
);

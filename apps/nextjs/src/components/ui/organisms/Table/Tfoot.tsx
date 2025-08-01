import { forwardRef } from '@/shared/chakra';
import {
  Tfoot as ChakraTfoot,
  type TableFooterProps as ChakraTfootProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraTfootProps;
export type TfootProps = Props;

export const Tfoot: React.FC<Props> = forwardRef<Props, 'tfoot'>(
  (props, ref) => <ChakraTfoot {...props} ref={ref} />,
);

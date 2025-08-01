import { forwardRef } from '@/shared/chakra';
import {
  Thead as ChakraThead,
  type TableHeadProps as ChakraTheadProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraTheadProps;
export type TheadProps = Props;

export const Thead: React.FC<Props> = forwardRef<Props, 'thead'>(
  (props, ref) => <ChakraThead {...props} ref={ref} />,
);

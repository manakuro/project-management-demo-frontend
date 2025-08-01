import { forwardRef } from '@/shared/chakra';
import {
  Th as ChakraTh,
  type TableColumnHeaderProps as ChakraThProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraThProps & {
  ref?: React.MutableRefObject<any>;
};
export type ThProps = Props;

export const Th: React.FC<Props> = forwardRef<Props, 'th'>((props, ref) => (
  <ChakraTh {...props} ref={ref} />
));

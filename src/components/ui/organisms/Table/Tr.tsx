import {
  Tr as ChakraTr,
  type TableRowProps as ChakraTrProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraTrProps;
export type TrProps = Props;

export const Tr: React.FC<Props> = forwardRef<Props, 'tr'>((props, ref) => (
  <ChakraTr {...props} ref={ref} />
));

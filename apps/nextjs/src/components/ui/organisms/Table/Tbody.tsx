import { forwardRef } from '@/shared/chakra';
import {
  Tbody as ChakraTbody,
  type TableBodyProps as ChakraTbodyProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraTbodyProps;
export type TbodyProps = Props;

export const Tbody: React.FC<Props> = forwardRef<Props, 'tbody'>(
  (props, ref) => <ChakraTbody {...props} ref={ref} />,
);

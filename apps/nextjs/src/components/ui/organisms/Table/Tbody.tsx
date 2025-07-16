import {
  Tbody as ChakraTbody,
  type TableBodyProps as ChakraTbodyProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraTbodyProps;
export type TbodyProps = Props;

export const Tbody: React.FC<Props> = forwardRef<Props, 'tbody'>(
  (props, ref) => <ChakraTbody {...props} ref={ref} />,
);

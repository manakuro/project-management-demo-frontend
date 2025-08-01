import { forwardRef } from '@/shared/chakra';
import {
  Box as ChakraBox,
  type BoxProps as ChakraBoxProps,
} from '@chakra-ui/react';
import type { DraggableProvided } from '@hello-pangea/dnd';
import type React from 'react';

type Props = ChakraBoxProps & {
  ref?: React.ForwardedRef<any> | DraggableProvided['innerRef'];
};
export type BoxProps = Props;

export const Box: React.FC<Props> = forwardRef<Props, 'div'>((props, ref) => (
  <ChakraBox {...props} ref={ref} />
));

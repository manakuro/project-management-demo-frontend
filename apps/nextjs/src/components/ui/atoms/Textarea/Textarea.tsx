import { forwardRef } from '@/shared/chakra';
import {
  Textarea as ChakraTextarea,
  type TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraTextareaProps & {
  ref?: React.ForwardedRef<any>;
};
export type TextareaProps = Props;

export const Textarea: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTextarea {...props} focusBorderColor="none" ref={ref} />
));

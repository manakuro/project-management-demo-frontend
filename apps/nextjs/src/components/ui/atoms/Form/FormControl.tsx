import { forwardRef } from '@/shared/chakra';
import {
  FormControl as ChakraFormControl,
  type FormControlProps as ChakraFormControlProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraFormControlProps;
export type FormControlProps = Props;

export const FormControl: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraFormControl {...props} ref={ref} />,
);

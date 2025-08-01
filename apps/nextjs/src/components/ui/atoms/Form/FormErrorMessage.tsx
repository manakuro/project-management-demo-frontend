import { forwardRef } from '@/shared/chakra';
import {
  FormErrorMessage as ChakraFormErrorMessage,
  type FormErrorMessageProps as ChakraFormErrorMessageProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraFormErrorMessageProps;
export type FormErrorMessageProps = Props;

export const FormErrorMessage: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraFormErrorMessage {...props} ref={ref} />,
);

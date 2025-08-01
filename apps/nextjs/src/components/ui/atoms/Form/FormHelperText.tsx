import { forwardRef } from '@/shared/chakra';
import {
  FormHelperText as ChakraFormHelperText,
  type HelpTextProps as ChakraHelpTextProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraHelpTextProps;
export type FormHelperTextProps = Props;

export const FormHelperText: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraFormHelperText {...props} ref={ref} />,
);

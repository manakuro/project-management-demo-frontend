import { forwardRef } from '@/shared/chakra';
import {
  InputLeftElement as ChakraInputLeftElement,
  type InputElementProps as ChakraInputLeftElementProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraInputLeftElementProps;
export type InputLeftElementProps = Props;

export const InputLeftElement: React.FC<Props> & { id?: string } = forwardRef<
  Props,
  'div'
>((props, ref) => <ChakraInputLeftElement {...props} ref={ref} />);

InputLeftElement.id = 'InputLeftElement';

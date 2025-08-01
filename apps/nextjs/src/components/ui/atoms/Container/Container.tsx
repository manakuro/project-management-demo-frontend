import { forwardRef } from '@/shared/chakra';
import {
  Container as ChakraContainer,
  type ContainerProps as ChakraContainerProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraContainerProps;
export type ContainerProps = Props;

export const Container: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraContainer {...props} ref={ref} />,
);

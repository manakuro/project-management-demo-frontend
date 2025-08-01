import { forwardRef } from '@/shared/chakra';
import {
  DrawerContent as ChakraDrawerContent,
  type DrawerContentProps as ChakraDrawerContentProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraDrawerContentProps & {
  ref?: React.MutableRefObject<any>;
};
export type DrawerContentProps = Props;

export const DrawerContent: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraDrawerContent {...props} ref={ref} />
));

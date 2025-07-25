import {
  Tabs as ChakraTabs,
  type TabsProps as ChakraTabsProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraTabsProps;
export type TabsProps = Props;

export const Tabs: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabs colorScheme="teal" size="sm" isLazy {...props} ref={ref} />
));

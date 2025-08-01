import { forwardRef } from '@/shared/chakra';
import {
  TabList as ChakraTabList,
  type TabListProps as ChakraTabListProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraTabListProps;
export type TabListProps = Props;

export const TabList: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabList borderBottom="none" {...props} ref={ref} />
));

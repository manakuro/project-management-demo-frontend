import {
  TabPanels as ChakraTabPanels,
  type TabPanelsProps as ChakraTabPanelsProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraTabPanelsProps;
export type TabPanelsProps = Props;

export const TabPanels: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabPanels {...props} ref={ref} />
));

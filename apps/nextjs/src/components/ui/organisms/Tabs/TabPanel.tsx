import {
  TabPanel as ChakraTabPanel,
  type TabPanelProps as ChakraTabPanelProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraTabPanelProps;
export type TabPanelProps = Props;

export const TabPanel: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabPanel p={0} h="full" {...props} ref={ref} />
));

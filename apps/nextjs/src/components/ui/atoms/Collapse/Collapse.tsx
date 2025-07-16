import {
  Collapse as ChakraCollapse,
  type CollapseProps as ChakraCollapseProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraCollapseProps;
export type CollapseProps = Props;

export const Collapse: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraCollapse {...props} ref={ref} />,
);

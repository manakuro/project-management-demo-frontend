import {
  PopoverContent as ChakraPopoverContent,
  type PopoverContentProps as ChakraPopoverContentProps,
} from '@chakra-ui/react';
import type React from 'react';

import { forwardRef } from '@/shared/chakra';

type Props = ChakraPopoverContentProps & {
  ref?: React.MutableRefObject<any>;
};
export type PopoverContentProps = Props;

export const PopoverContent: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => (
    <ChakraPopoverContent {...props} ref={ref} aria-label="popover-content" />
  ),
);

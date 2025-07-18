import {
  PopoverBody as ChakraPopoverBody,
  type PopoverBodyProps as ChakraPopoverBodyProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraPopoverBodyProps & {
  ref?: React.MutableRefObject<any>;
};
export type PopoverBodyProps = Props;

export const PopoverBody: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraPopoverBody {...props} ref={ref} />
));

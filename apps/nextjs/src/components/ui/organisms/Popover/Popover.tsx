import {
  Popover as ChakraPopover,
  type PopoverProps as ChakraPopoverProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraPopoverProps;
export type PopoverProps = Props;

export const Popover: React.FC<Props> = (props) => {
  return <ChakraPopover {...props} />;
};

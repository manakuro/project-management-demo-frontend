import {
  PopoverHeader as ChakraPopoverHeader,
  type PopoverHeaderProps as ChakraPopoverHeaderProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraPopoverHeaderProps;
export type PopoverHeaderProps = Props;

export const PopoverHeader: React.FC<Props> = (props) => {
  return <ChakraPopoverHeader {...props} />;
};

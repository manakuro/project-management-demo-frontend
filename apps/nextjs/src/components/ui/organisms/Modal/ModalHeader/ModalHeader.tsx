import {
  ModalHeader as ChakraModalHeader,
  type ModalHeaderProps as ChakraModalHeaderProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraModalHeaderProps;
export type ModalHeaderProps = Props;

export const ModalHeader: React.FC<Props> = (props) => {
  return <ChakraModalHeader {...props} />;
};

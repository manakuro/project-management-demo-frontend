import {
  DrawerBody as ChakraDrawerBody,
  type ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraModalBodyProps;
export type DrawerBodyProps = Props;

export const DrawerBody: React.FC<Props> = (props) => {
  return <ChakraDrawerBody {...props} />;
};

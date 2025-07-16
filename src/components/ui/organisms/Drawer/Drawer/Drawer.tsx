import {
  Drawer as ChakraDrawer,
  type DrawerProps as ChakraDrawerProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraDrawerProps;
export type DrawerProps = Props;

export const Drawer: React.FC<Props> = (props) => {
  return <ChakraDrawer {...props} />;
};

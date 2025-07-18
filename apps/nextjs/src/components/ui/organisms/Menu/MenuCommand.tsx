import {
  MenuCommand as ChakraMenuCommand,
  type MenuCommandProps as ChakraMenuCommandProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraMenuCommandProps;
export type MenuCommandProps = Props;

export const MenuCommand: React.FC<Props> = (props) => {
  return <ChakraMenuCommand {...props} />;
};

import { type BoxProps, Box as ChakraBox } from '@chakra-ui/react';
import type React from 'react';

type Props = BoxProps & {
  mobile?: boolean;
  pc?: boolean;
};

export const Media: React.FC<Props> = ({ pc, mobile, ...rest }) => {
  switch (true) {
    case Boolean(mobile):
      return <ChakraBox display={{ base: 'block', md: 'none' }} {...rest} />;
    case Boolean(pc):
      return <ChakraBox display={{ base: 'none', md: 'block' }} {...rest} />;
    default:
      return <>{rest.children}</>;
  }
};

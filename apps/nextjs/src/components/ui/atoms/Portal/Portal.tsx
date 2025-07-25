import {
  Portal as ChakraPortal,
  type PortalProps as ChakraPortalProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraPortalProps & {
  ref?: React.MutableRefObject<any>;
};
export type PortalProps = ChakraPortalProps;

export const Portal: React.FC<Props> = (props) => {
  return <ChakraPortal {...props} />;
};

import { Divider as ChakraDivider, type DividerProps } from '@chakra-ui/react';
import type React from 'react';

type Props = DividerProps;

export const Divider: React.FC<Props> = (props) => {
  return <ChakraDivider {...props} />;
};

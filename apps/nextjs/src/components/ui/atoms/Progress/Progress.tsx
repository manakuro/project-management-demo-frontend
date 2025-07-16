import {
  Progress as ChakraProgress,
  type ProgressProps as ChakraProgressProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraProgressProps;
export type ProgressProps = Props;

export const Progress: React.FC<Props> = (props) => {
  return <ChakraProgress borderRadius="md" {...props} />;
};

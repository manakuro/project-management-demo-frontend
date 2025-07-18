import {
  Text as ChakraText,
  type TextProps as ChakraTextProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraTextProps;
export type TextProps = Props;

export const Text: React.FC<Props> = (props) => {
  return <ChakraText {...props} />;
};

import {
  Radio as ChakraRadio,
  type RadioProps as ChakraRadioProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraRadioProps;
export type RadioProps = Props;

export const Radio: React.FC<Props> = (props) => {
  return <ChakraRadio {...props} />;
};

import {
  RadioGroup as ChakraRadioGroup,
  type RadioGroupProps as ChakraRadioGroupProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraRadioGroupProps;
export type RadioGroupProps = Props;

export const RadioGroup: React.FC<Props> = (props) => {
  return <ChakraRadioGroup {...props} />;
};

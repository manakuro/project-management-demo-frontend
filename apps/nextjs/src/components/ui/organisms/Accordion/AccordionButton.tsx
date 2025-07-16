import {
  AccordionButton as ChakraAccordionButton,
  type AccordionButtonProps as ChakraAccordionButtonProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraAccordionButtonProps;
export type AccordionButtonProps = Props;

export const AccordionButton: React.FC<Props> = (props) => {
  return <ChakraAccordionButton {...props} />;
};

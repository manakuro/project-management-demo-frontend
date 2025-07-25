import {
  Checkbox as ChakraCheckBox,
  type CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraCheckboxProps;
export type CheckboxProps = Props;

export const Checkbox: React.FC<Props> = (props) => {
  return (
    <ChakraCheckBox
      {...props}
      // @see https://github.com/chakra-ui/chakra-ui/issues/2234
      sx={{
        '> span:first-of-type': {
          boxShadow: 'unset',
        },
      }}
    />
  );
};

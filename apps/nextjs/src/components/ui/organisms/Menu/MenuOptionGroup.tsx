import {
  MenuOptionGroup as ChakraMenuOptionGroup,
  type MenuOptionGroupProps as ChakraMenuOptionGroupProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraMenuOptionGroupProps;
export type MenuOptionGroupProps = Props;

export const MenuOptionGroup: React.FC<Props> & { id?: string } = (props) => {
  return <ChakraMenuOptionGroup {...props} />;
};

MenuOptionGroup.id = 'MenuOptionGroup';

import {
  MenuList as ChakraMenuList,
  type MenuListProps as ChakraMenuListProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraMenuListProps & {
  ref?: React.MutableRefObject<any>;
};
export type MenuListProps = Props;

export const MenuList: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraMenuList
    zIndex="popover"
    {...props}
    ref={ref}
    aria-label="menu-list"
  />
));

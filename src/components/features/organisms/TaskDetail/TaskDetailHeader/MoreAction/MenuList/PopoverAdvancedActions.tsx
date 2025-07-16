import type React from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  type MenuProps,
} from 'src/components/ui/organisms/Menu';
import { chakra } from 'src/shared/chakra';

type Props = {
  onClose: () => void;
} & MenuProps;

export const PopoverAdvancedActions: React.FC<Props> = (props) => {
  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="5px">
        <MenuItem as="div" isDisabled>
          Make a subtask of
        </MenuItem>
        <MenuItem as="div" isDisabled>
          Convert to a project
        </MenuItem>
        <MenuItem as="div" command="⇧+Tab+D" isDisabled>
          Merge duplicate tasks
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

// NOTE: Use custom component instead of `Box` because of styling issue with positioning menu item
const MenuButtonAs = chakra('div', {
  baseStyle: {
    w: 'full',
  },
});

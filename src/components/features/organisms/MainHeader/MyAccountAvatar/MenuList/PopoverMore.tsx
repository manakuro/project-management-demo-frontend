import type React from 'react';
import { useCallback } from 'react';
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

export const PopoverMore: React.FC<Props> = (props) => {
  const handleCreateNewWorkspace = useCallback(() => {
    // do something
    props.onClose();
  }, [props]);

  const handleRemoveMe = useCallback(() => {
    // do something
    props.onClose();
  }, [props]);

  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="5px">
        <MenuItem as="div" onClick={handleCreateNewWorkspace} isDisabled>
          Create New Workspace
        </MenuItem>
        <MenuItem as="div" onClick={handleRemoveMe} isDisabled>
          Remove me from this Workspace
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

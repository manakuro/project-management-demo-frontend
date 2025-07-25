import type React from 'react';
import { useCallback } from 'react';
import { Flex, Icon, Portal, Text } from 'src/components/ui/atoms';
import {
  MenuList as AtomsMenuList,
  MenuDivider,
  MenuItem,
} from 'src/components/ui/organisms/Menu';
import { useClickOutside } from 'src/hooks/useClickOutside';
import { useDisclosure } from 'src/shared/chakra';
import { AddToAnotherProject } from './AddToAnotherProject';
import { DeleteTask } from './DeleteTask';
import { PopoverAdvancedActions } from './PopoverAdvancedActions';
import { Print } from './Print';

type Props = {
  onCloseMenu: () => void;
  taskId: string;
};

export const MenuList: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref } = useClickOutside(() => {
    handleCloseAll();
  });

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCloseAll = useCallback(() => {
    onClose();
    props.onCloseMenu();
  }, [onClose, props]);

  return (
    <Portal>
      <AtomsMenuList ref={ref} zIndex={1}>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="fullscreenOutline" color="text.muted" />}
          command="Tab+X"
          isDisabled
        >
          Full screen
        </MenuItem>
        <AddToAnotherProject
          onMouseEnter={handleClose}
          taskId={props.taskId}
          onClose={handleCloseAll}
        />
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="squareRounded" color="text.muted" />}
          isDisabled
        >
          Mark as Milestone
        </MenuItem>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="beenHere" color="text.muted" />}
          isDisabled
        >
          Mark as Approval
        </MenuItem>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="gitPullRequest" color="text.muted" />}
          isDisabled
        >
          Make dependent
        </MenuItem>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="tag" color="text.muted" />}
          command="Tab+T"
          isDisabled
        >
          Add tags
        </MenuItem>
        <MenuDivider />
        <MenuItem onMouseEnter={handleClose} isDisabled>
          Duplicate task
        </MenuItem>
        <MenuItem onMouseEnter={handleClose} command="⌘+Tab+N" isDisabled>
          Create follow-up task
        </MenuItem>
        <Print
          onMouseEnter={handleClose}
          taskId={props.taskId}
          onClose={handleCloseAll}
        />
        <MenuItem onMouseEnter={handleOpen}>
          <PopoverAdvancedActions
            isOpen={isOpen}
            placement="left"
            onClose={handleCloseAll}
          >
            <Flex flex={1}>
              <Text fontSize="sm" flex={1}>
                Advanced actions
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverAdvancedActions>
        </MenuItem>
        <MenuDivider />
        <DeleteTask
          onMouseEnter={handleClose}
          taskId={props.taskId}
          onClose={handleCloseAll}
        />
      </AtomsMenuList>
    </Portal>
  );
};

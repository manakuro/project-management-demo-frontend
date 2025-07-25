import type React from 'react';
import { useCallback } from 'react';
import type { IconButtonProps } from 'src/components/ui/atoms';
import {
  Menu,
  MenuButton,
  type MenuButtonProps,
} from 'src/components/ui/organisms/Menu';
import { type ChakraProps, useDisclosure } from 'src/shared/chakra';
import { useProject } from 'src/store/entities/project';
import { MenuList } from './MenuList';

type Props = MenuButtonProps & {
  projectId: string;
  closeMenu?: boolean;
  addFavorite?: boolean;
  removeFavorite?: boolean;
  duplicateProject?: boolean;
  archiveProject?: boolean;
  deleteProject?: boolean;
  editProjectDetails?: boolean;
  copyProjectLink?: boolean;
  share?: boolean;
  iconButton?: IconButtonProps;
  menuButtonStyle?: ChakraProps;
  onOpened?: () => void;
  onClosed?: () => void;
};
export type PopoverProjectMenuProps = Props;

export const PopoverProjectMenu: React.FC<Props> = (props) => {
  const {
    projectId,
    addFavorite,
    removeFavorite,
    duplicateProject,
    archiveProject,
    deleteProject,
    editProjectDetails,
    copyProjectLink,
    share,
    iconButton,
    menuButtonStyle,
    onOpened,
    onClosed,
  } = props;
  const { project } = useProject(projectId);
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleCloseMenu = useCallback(() => {
    onClose();
    onClosed?.();
  }, [onClose, onClosed]);

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onOpen();
      onOpened?.();
    },
    [onOpen, onOpened],
  );

  return (
    <Menu closeOnBlur={false} closeOnSelect={false} isOpen={isOpen} isLazy>
      <MenuButton onClick={handleOpen} {...iconButton} {...menuButtonStyle}>
        {props.children}
      </MenuButton>
      {isOpen && (
        <MenuList
          project={project}
          onCloseMenu={handleCloseMenu}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          duplicateProject={duplicateProject}
          archiveProject={archiveProject}
          deleteProject={deleteProject}
          editProjectDetails={editProjectDetails}
          copyProjectLink={copyProjectLink}
          share={share}
        />
      )}
    </Menu>
  );
};

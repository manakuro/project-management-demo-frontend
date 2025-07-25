import type React from 'react';
import { useCallback } from 'react';
import { PopoverSetColorAndIcon } from 'src/components/features/organisms/Popovers';
import { ColorBox, Flex, Icon, Portal, Text } from 'src/components/ui/atoms';
import {
  MenuList as AtomsMenuList,
  MenuDivider,
} from 'src/components/ui/organisms/Menu';
import { useClickOutside } from 'src/hooks/useClickOutside';
import { useDisclosure } from 'src/shared/chakra';
import type { Project } from 'src/store/entities/project';
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor';
import { ArchiveProject } from './ArchiveProject';
import { CopyProjectLink } from './CopyProjectLink';
import { DeleteProject } from './DeleteProject';
import { DuplicateProject } from './DuplicateProject';
import { EditProjectDetails } from './EditProjectDetails';
import { Favorite } from './Favorite';
import { MenuItem } from './MenuItem';
import { Share } from './Share';

type Props = {
  project: Project;
  onCloseMenu: () => void;
  addFavorite?: boolean;
  removeFavorite?: boolean;
  duplicateProject?: boolean;
  archiveProject?: boolean;
  deleteProject?: boolean;
  editProjectDetails?: boolean;
  copyProjectLink?: boolean;
  share?: boolean;
};

export const MenuList: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref } = useClickOutside(() => {
    onClose();
    props.onCloseMenu();
  });
  const { projectBaseColor } = useProjectBaseColor(
    props.project.projectBaseColorId,
  );

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Portal>
      <AtomsMenuList color="text.base" ref={ref}>
        <MenuItem
          icon={
            <ColorBox
              size="md"
              color={projectBaseColor.color.color}
              mt="-1px"
            />
          }
          onMouseEnter={handleOpen}
          onClick={(e) => e.stopPropagation()}
        >
          <PopoverSetColorAndIcon
            project={props.project}
            isOpen={isOpen}
            placement="right-end"
          >
            <Flex>
              <Text fontSize="sm" flex={1}>
                Set Color & icon
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverSetColorAndIcon>
        </MenuItem>
        <MenuDivider />
        {props.addFavorite && (
          <Favorite
            onClose={props.onCloseMenu}
            projectId={props.project.id}
            onMouseEnter={handleClose}
          />
        )}
        {props.editProjectDetails && (
          <EditProjectDetails
            onClose={props.onCloseMenu}
            onMouseEnter={handleClose}
            projectId={props.project.id}
          />
        )}
        {props.copyProjectLink && (
          <CopyProjectLink
            onClose={props.onCloseMenu}
            onMouseEnter={handleClose}
            projectId={props.project.id}
          />
        )}
        {props.share && (
          <Share
            onClose={props.onCloseMenu}
            onMouseEnter={handleClose}
            projectId={props.project.id}
          />
        )}
        {props.duplicateProject && (
          <DuplicateProject
            onClose={props.onCloseMenu}
            onMouseEnter={handleClose}
            projectId={props.project.id}
          />
        )}
        {props.archiveProject && (
          <ArchiveProject
            onClose={props.onCloseMenu}
            onMouseEnter={handleClose}
            projectId={props.project.id}
          />
        )}
        {props.deleteProject && (
          <DeleteProject
            onClose={props.onCloseMenu}
            onMouseEnter={handleClose}
            projectId={props.project.id}
          />
        )}
      </AtomsMenuList>
    </Portal>
  );
};

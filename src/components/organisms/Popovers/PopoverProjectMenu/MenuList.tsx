import React, { useCallback } from 'react'
import { Flex, Text, Icon, Portal, ColorBox } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItem as AtomsMenuItem,
  MenuDivider,
  MenuItemProps,
  PopoverSetColorAndIcon,
} from 'src/components/organisms'
import { Project } from 'src/store/projects'
import { useDisclosure } from 'src/shared/chakra'
import { useClickOutside } from 'src/hooks/useClickOutside'

type Props = {
  project: Project
  onCloseMenu: () => void
  onAddFavorite?: () => void
  onRemoveFavorite?: () => void
  onDuplicateProject?: () => void
  onArchiveProject?: () => void
  onDeleteProject?: () => void
  onEditNamesAndDescriptionProject?: () => void
  onCopyProjectLink?: () => void
  onShare?: () => void
  addFavorite?: boolean
  removeFavorite?: boolean
  duplicateProject?: boolean
  archiveProject?: boolean
  deleteProject?: boolean
  editNamesAndDescriptionProject?: boolean
  copyProjectLink?: boolean
  share?: boolean
}

export const MenuList: React.VFC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ref } = useClickOutside(() => {
    onClose()
    props.onCloseMenu()
  })

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Portal>
      <AtomsMenuList color="text.base" ref={ref}>
        <MenuItem
          icon={
            <ColorBox size="md" color={props.project.color.color} mt="-1px" />
          }
          onMouseEnter={handleOpen}
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
          <MenuItem onMouseEnter={handleClose} onClick={props.onAddFavorite}>
            Add to Favorites
          </MenuItem>
        )}
        {props.removeFavorite && (
          <MenuItem onMouseEnter={handleClose} onClick={props.onRemoveFavorite}>
            Remove from Favorites
          </MenuItem>
        )}
        {props.editNamesAndDescriptionProject && (
          <MenuItem
            onMouseEnter={handleClose}
            onClick={props.onEditNamesAndDescriptionProject}
          >
            Edit Name & Description
          </MenuItem>
        )}
        {props.copyProjectLink && (
          <MenuItem
            onMouseEnter={handleClose}
            onClick={props.onCopyProjectLink}
          >
            Copy Project Link
          </MenuItem>
        )}
        {props.share && (
          <MenuItem onMouseEnter={handleClose} onClick={props.onShare}>
            Share
          </MenuItem>
        )}
        {props.duplicateProject && (
          <MenuItem
            onMouseEnter={handleClose}
            onClick={props.onDuplicateProject}
          >
            Duplicate Project
          </MenuItem>
        )}
        {props.archiveProject && (
          <MenuItem onMouseEnter={handleClose} onClick={props.onArchiveProject}>
            Archive Project
          </MenuItem>
        )}
        {props.deleteProject && (
          <MenuItem onMouseEnter={handleClose} onClick={props.onDeleteProject}>
            Delete Project
          </MenuItem>
        )}
      </AtomsMenuList>
    </Portal>
  )
}

const MenuItem: React.FC<MenuItemProps> = (props) => (
  <AtomsMenuItem fontSize="sm" iconSpacing={3} {...props} />
)

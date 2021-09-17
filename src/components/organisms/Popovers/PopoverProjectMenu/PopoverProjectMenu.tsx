import React, { useCallback } from 'react'
import { IconButtonProps } from 'src/components/atoms'
import {
  Menu,
  MenuButton,
  MenuButtonProps,
} from 'src/components/organisms/Menu'
import { ChakraProps, useDisclosure } from 'src/shared/chakra'
import { useProject } from 'src/store/entities/projects'
import { MenuList } from './MenuList'

type Props = MenuButtonProps & {
  projectId: string
  closeMenu?: boolean
  addFavorite?: boolean
  removeFavorite?: boolean
  duplicateProject?: boolean
  archiveProject?: boolean
  deleteProject?: boolean
  editNamesAndDescriptionProject?: boolean
  copyProjectLink?: boolean
  share?: boolean
  iconButton?: IconButtonProps
  menuButtonStyle?: ChakraProps
  onOpened?: () => void
  onClosed?: () => void
}
export type PopoverProjectMenuProps = Props

export const PopoverProjectMenu: React.VFC<Props> = (props) => {
  const {
    projectId,
    addFavorite,
    removeFavorite,
    duplicateProject,
    archiveProject,
    deleteProject,
    editNamesAndDescriptionProject,
    copyProjectLink,
    share,
    iconButton,
    menuButtonStyle,
    onOpened,
    onClosed,
  } = props
  const { project } = useProject(projectId)
  const { onClose, onOpen, isOpen } = useDisclosure()

  const handleCloseMenu = useCallback(() => {
    onClose()
    onClosed?.()
  }, [onClose, onClosed])

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onOpen()
      onOpened?.()
    },
    [onOpen, onOpened],
  )

  const handleAddFavorite = useCallback(() => {
    console.log('handleAddFavorite!')
  }, [])
  const handleRemoveFavorite = useCallback(() => {
    console.log('handleRemoveFavorite!')
  }, [])
  const handleDuplicateProject = useCallback(() => {
    console.log('handleDuplicateProject!')
  }, [])
  const handleArchiveProject = useCallback(() => {
    console.log('handleArchiveProject!')
  }, [])
  const handleDeleteProject = useCallback(() => {
    console.log('handleDeleteProject!')
  }, [])
  const handleEditNamesAndDescriptionProject = useCallback(() => {
    console.log('handleEditNamesAndDescriptionProject!')
  }, [])
  const handleCopyProjectLink = useCallback(() => {
    console.log('handleCopyProjectLink!')
  }, [])
  const handleShare = useCallback(() => {
    console.log('handleShare!')
  }, [])

  return (
    <Menu closeOnBlur={false} closeOnSelect={false} isOpen={isOpen} isLazy>
      <MenuButton onClick={handleOpen} {...iconButton} {...menuButtonStyle}>
        {props.children}
      </MenuButton>
      {isOpen && (
        <MenuList
          project={project}
          onCloseMenu={handleCloseMenu}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          onDuplicateProject={handleDuplicateProject}
          onArchiveProject={handleArchiveProject}
          onDeleteProject={handleDeleteProject}
          onEditNamesAndDescriptionProject={
            handleEditNamesAndDescriptionProject
          }
          onCopyProjectLink={handleCopyProjectLink}
          onShare={handleShare}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          duplicateProject={duplicateProject}
          archiveProject={archiveProject}
          deleteProject={deleteProject}
          editNamesAndDescriptionProject={editNamesAndDescriptionProject}
          copyProjectLink={copyProjectLink}
          share={share}
        />
      )}
    </Menu>
  )
}

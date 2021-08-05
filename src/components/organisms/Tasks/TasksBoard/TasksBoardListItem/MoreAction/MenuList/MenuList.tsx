import React, { memo, useCallback } from 'react'
import { Flex, Icon, Portal, Text } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItem,
  MenuDivider,
} from 'src/components/organisms'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { useDisclosure } from 'src/shared/chakra'
import { useTasksBoardListItemInputContext } from '../../Provider'
import { PopoverAddCoverImageActions } from './PopoverAddCoverImageActions'

type Props = {
  onCloseMenu: () => void
}

export const MenuList: React.FC<Props> = memo((props) => {
  const { onInputSelect } = useTasksBoardListItemInputContext()
  const { onCloseMenu } = props

  const handleEditTaskName = useCallback(() => {
    onInputSelect()
    onCloseMenu()
  }, [onCloseMenu, onInputSelect])

  return <Component onEditTaskName={handleEditTaskName} {...props} />
})

type ComponentProps = {
  onCloseMenu: () => void
  onEditTaskName: () => void
}
const Component: React.FC<ComponentProps> = memo((props) => {
  const { onCloseMenu, onEditTaskName } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ref } = useClickOutside(() => {
    handleCloseAll()
  })

  const handleCloseAll = useCallback(() => {
    onClose()
    onCloseMenu()
  }, [onClose, onCloseMenu])

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLElement>) => e.stopPropagation(),
    [],
  )

  return (
    <Portal>
      <AtomsMenuList ref={ref} zIndex={1} onClick={stopPropagation}>
        <MenuItem
          onMouseEnter={onClose}
          icon={<Icon icon="editAlt" color="text.muted" />}
          onClick={onEditTaskName}
        >
          Edit task name
        </MenuItem>
        <MenuItem onMouseEnter={onOpen}>
          <PopoverAddCoverImageActions
            isOpen={isOpen}
            placement="right"
            onClose={handleCloseAll}
          >
            <Flex flex={1}>
              <Icon icon="photoAlbum" size="sm" color="text.muted" mt="2px" />
              <Text fontSize="sm" flex={1} ml={2}>
                Add cover image
              </Text>
              <Icon icon="chevronRight" color="text.muted" />
            </Flex>
          </PopoverAddCoverImageActions>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onMouseEnter={onClose}
          icon={<Icon icon="checkCircle" color="text.muted" />}
        >
          Mark complete
        </MenuItem>
        <MenuItem
          onMouseEnter={onClose}
          icon={<Icon icon="detail" color="text.muted" />}
        >
          View details
        </MenuItem>
        <MenuItem
          onMouseEnter={onClose}
          icon={<Icon icon="linkExternal" color="text.muted" />}
        >
          Open in new tab
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onMouseEnter={onClose}
          icon={<Icon icon="copyAlt" color="text.muted" />}
        >
          Duplicate task
        </MenuItem>
        <MenuItem
          onMouseEnter={onClose}
          icon={<Icon icon="link" color="text.muted" />}
        >
          Copy task link
        </MenuItem>
        <MenuDivider />
        <MenuItem onMouseEnter={onClose} color="alert">
          Delete task
        </MenuItem>
      </AtomsMenuList>
    </Portal>
  )
})

MenuList.displayName = 'MenuList'

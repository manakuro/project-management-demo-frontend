import React, { useCallback } from 'react'
import { ColorBox, Flex, Icon, Portal, Text } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItem,
  MenuDivider,
} from 'src/components/organisms/Menu'
import { PopoverSetColorAndIcon } from 'src/components/organisms/Popovers'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { useDisclosure } from 'src/shared/chakra'
import { useProject } from 'src/store/entities/projects'
import { PopoverAdvancedActions } from './PopoverAdvancedActions'

type Props = {
  onCloseMenu: () => void
  projectId: string
}

export const MenuList: React.FC<Props> = (props) => {
  const { projectId } = props
  const { project } = useProject(projectId)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ref } = useClickOutside(() => {
    handleCloseAll()
  })

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleCloseAll = useCallback(() => {
    onClose()
    props.onCloseMenu()
  }, [onClose, props])

  return (
    <Portal>
      <AtomsMenuList ref={ref} zIndex={1}>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="pencil" color="text.muted" />}
        >
          Edit Project details
        </MenuItem>
        <MenuItem
          icon={<ColorBox size="md" color={project.color.color} mt="-1px" />}
          onMouseEnter={handleOpen}
        >
          <PopoverSetColorAndIcon
            project={project}
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
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="link" color="text.muted" />}
        >
          Copy project link
        </MenuItem>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="save" color="text.muted" />}
        >
          Save layout as default
        </MenuItem>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="copyAlt" color="text.muted" />}
          isDisabled
        >
          Duplicate
        </MenuItem>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="layout" color="text.muted" />}
          isDisabled
        >
          Convert to template
        </MenuItem>
        <MenuItem
          onMouseEnter={handleClose}
          icon={<Icon icon="plus" color="text.muted" />}
          isDisabled
        >
          Add to Portfolio
        </MenuItem>
        <MenuDivider />
        <MenuItem onMouseEnter={handleOpen}>
          <PopoverAdvancedActions
            isOpen={isOpen}
            placement="right"
            onClose={handleCloseAll}
          >
            <Flex flex={1}>
              <Text fontSize="sm" flex={1}>
                Import
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverAdvancedActions>
        </MenuItem>
        <MenuItem onMouseEnter={handleOpen}>
          <PopoverAdvancedActions
            isOpen={isOpen}
            placement="right"
            onClose={handleCloseAll}
          >
            <Flex flex={1}>
              <Text fontSize="sm" flex={1}>
                Export/Print
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverAdvancedActions>
        </MenuItem>
        <MenuItem onMouseEnter={handleClose}>Archive</MenuItem>
        <MenuItem onMouseEnter={handleClose} color="alert">
          Delete project
        </MenuItem>
      </AtomsMenuList>
    </Portal>
  )
}

import React, { useCallback } from 'react'
import { Flex, Text, Icon, Portal, ColorBox } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItem as AtomsMenuItem,
  MenuDivider,
  MenuItemProps,
  PopoverSetColorAndIcon,
} from 'src/components/organisms'
import { Project } from 'src/store/entities/projects'
import { useDisclosure } from 'src/shared/chakra'
import { useClickOutside } from 'src/hooks/useClickOutside'

type Props = {
  project: Project
  onCloseMenu: () => void
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
        <MenuItem onMouseEnter={handleClose}>Add to Favorites</MenuItem>
        <MenuItem onMouseEnter={handleClose}>Duplicate Project</MenuItem>
        <MenuItem onMouseEnter={handleClose}>Archive Project</MenuItem>
        <MenuItem onMouseEnter={handleClose} color="alert">
          Delete Project
        </MenuItem>
      </AtomsMenuList>
    </Portal>
  )
}

const MenuItem: React.FC<MenuItemProps> = (props) => (
  <AtomsMenuItem fontSize="sm" iconSpacing={3} {...props} />
)

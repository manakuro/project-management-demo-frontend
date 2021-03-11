import React, { useCallback, useEffect } from 'react'
import { Flex, Icon, Link, Portal, Text } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItem,
  MenuDivider,
} from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { PopoverMore } from './PopoverMore'

type Props = {
  onCloseMenu: () => void
}

export const MenuList: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ref, hasClickedOutside } = useClickOutside()

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

  useEffect(() => {
    if (hasClickedOutside) {
      handleCloseAll()
    }
  }, [hasClickedOutside, handleCloseAll])

  return (
    <Portal>
      <AtomsMenuList ref={ref}>
        <MenuItem onMouseEnter={handleClose}>My workspace</MenuItem>
        <MenuDivider />
        <MenuItem onMouseEnter={handleClose}>Admin Console</MenuItem>
        <MenuItem onMouseEnter={handleOpen}>
          <PopoverMore
            isOpen={isOpen}
            placement="left"
            onClose={handleCloseAll}
          >
            <Flex flex={1}>
              <Text fontSize="sm" flex={1}>
                More
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverMore>
        </MenuItem>
        <MenuDivider />
        <MenuItem onMouseEnter={handleClose} link>
          <Link isExternal href="https://google.com">
            Privacy Policy
          </Link>
        </MenuItem>
        <MenuItem onMouseEnter={handleClose}>Logout</MenuItem>
      </AtomsMenuList>
    </Portal>
  )
}

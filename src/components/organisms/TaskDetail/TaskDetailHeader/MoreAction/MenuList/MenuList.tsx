import React, { useCallback, useEffect } from 'react'
import { Flex, Icon, Text } from 'src/components/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItem,
  MenuDivider,
} from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { PopoverAdvancedActions } from './PopoverAdvancedActions'

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
    <AtomsMenuList ref={ref} zIndex={1}>
      <MenuItem
        onMouseEnter={handleClose}
        icon={<Icon icon="fullscreenOutline" color="text.muted" />}
        command="Tab+X"
      >
        Full screen
      </MenuItem>
      <MenuItem
        onMouseEnter={handleClose}
        icon={<Icon icon="bookAdd" color="text.muted" />}
        command="Tab+P"
      >
        Add to another project
      </MenuItem>
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
      >
        Add tags
      </MenuItem>
      <MenuDivider />
      <MenuItem onMouseEnter={handleClose}>Duplicate task</MenuItem>
      <MenuItem onMouseEnter={handleClose} command="⌘+Tab+N">
        Create follow-up task
      </MenuItem>
      <MenuItem onMouseEnter={handleClose}>Print</MenuItem>
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
      <MenuItem onMouseEnter={handleClose} command="Tab+Del" color="alert">
        Delete task
      </MenuItem>
    </AtomsMenuList>
  )
}

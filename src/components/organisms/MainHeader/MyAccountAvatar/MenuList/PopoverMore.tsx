import React, { useCallback } from 'react'
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuProps,
} from 'src/components/organisms'
import { chakra } from 'src/shared/chakra'

type Props = {
  onClose: () => void
} & MenuProps

export const PopoverMore: React.FC<Props> = (props) => {
  const handleCreateNewWorkspace = useCallback(() => {
    // do something
    props.onClose()
  }, [props])

  const handleRemoveMe = useCallback(() => {
    // do something
    props.onClose()
  }, [props])

  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" mr="5px">
        <MenuItem as="div" onClick={handleCreateNewWorkspace}>
          Create New Workspace
        </MenuItem>
        <MenuItem as="div" onClick={handleRemoveMe}>
          Remove me from this Workspace
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

// NOTE: Use custom component instead of `Box` because of styling issue
const MenuButtonAs = chakra('div', {
  baseStyle: {
    w: 'full',
  },
})

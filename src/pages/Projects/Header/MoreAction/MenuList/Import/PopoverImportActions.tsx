import React from 'react'
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuProps,
} from 'src/components/organisms/Menu'
import { chakra } from 'src/shared/chakra'

type Props = {
  onClose: () => void
} & MenuProps

export const PopoverImportActions: React.FC<Props> = (props) => {
  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" ml="5px">
        <MenuItem as="div">CSV</MenuItem>
        <MenuItem as="div">Email</MenuItem>
      </MenuList>
    </Menu>
  )
}

// NOTE: Use custom component instead of `Box` because of styling issue with positioning menu item
const MenuButtonAs = chakra('div', {
  baseStyle: {
    w: 'full',
  },
})

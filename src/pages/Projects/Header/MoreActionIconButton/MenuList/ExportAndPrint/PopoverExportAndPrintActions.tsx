import type React from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  type MenuProps,
} from 'src/components/ui/organisms/Menu'
import { chakra } from 'src/shared/chakra'

type Props = {
  onClose: () => void
} & MenuProps

export const PopoverExportAndPrintActions: React.FC<Props> = (props) => {
  return (
    <Menu isLazy {...props}>
      <MenuButton w="full" as={MenuButtonAs}>
        {props.children}
      </MenuButton>
      <MenuList pointerEvents="auto" ml="5px">
        <MenuItem as="div" isDisabled>
          Sync to calendar
        </MenuItem>
        <MenuItem as="div" isDisabled>
          CSV
        </MenuItem>
        <MenuItem as="div" isDisabled>
          JSON
        </MenuItem>
        <MenuItem as="div" isDisabled>
          Print
        </MenuItem>
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

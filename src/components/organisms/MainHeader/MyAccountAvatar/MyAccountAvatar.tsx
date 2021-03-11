import React from 'react'
import { Avatar, Link, Portal, Text, TextProps } from 'src/components/atoms'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from 'src/components/organisms'

export const MyAccountAvatar: React.FC = (props) => {
  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton>
        <Avatar
          name="Manato Kuroda"
          src="/images/cat_img.png"
          size="sm"
          cursor="pointer"
          bg="teal.200"
        />
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>
            <MenuListItemText>My workspace</MenuListItemText>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <MenuListItemText>Admin Console</MenuListItemText>
          </MenuItem>
          <MenuItem>
            <MenuListItemText>More</MenuListItemText>
          </MenuItem>
          <MenuDivider />
          <MenuItem link>
            <Link isExternal href="https://google.com">
              <MenuListItemText>Privacy Policy</MenuListItemText>
            </Link>
          </MenuItem>
          <MenuItem>
            <MenuListItemText>Logout</MenuListItemText>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

const MenuListItemText: React.FC<TextProps> = (props) => {
  return <Text fontSize="sm" {...props} />
}

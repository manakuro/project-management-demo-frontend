import React, { memo } from 'react'
import { Portal } from 'src/components/atoms'
import {
  Menu as OrganismsMenu,
  MenuProps,
  MenuItem,
  MenuList,
} from 'src/components/organisms'

type Props = MenuProps

export const ThumbnailMenu: React.FC<Props> = memo((props) => {
  return (
    <OrganismsMenu isLazy {...props}>
      {props.children}
      <Portal>
        <MenuList>
          <MenuItem>Download attachment</MenuItem>
          <MenuItem color="alert">Delete attachment</MenuItem>
        </MenuList>
      </Portal>
    </OrganismsMenu>
  )
})

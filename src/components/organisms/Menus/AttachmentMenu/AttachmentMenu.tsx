import React, { memo } from 'react'
import { Portal } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { Menu, MenuItem, MenuList, MenuGroup } from 'src/components/organisms'

type Props = {
  label: string
}

export const AttachmentMenu: React.FC<Props> = memo((props) => {
  return (
    <Menu isLazy>
      <Tooltip
        hasArrow
        label={props.label}
        aria-label="Attachment button"
        size="md"
        withIcon
      >
        {props.children}
      </Tooltip>
      <Portal>
        <MenuList>
          <MenuGroup title="Attach a File">
            <MenuItem>Your computer</MenuItem>
            <MenuItem>Dropbox</MenuItem>
            <MenuItem>Google Drive</MenuItem>
            <MenuItem>Box</MenuItem>
            <MenuItem>OneDrive/SharePoint</MenuItem>
          </MenuGroup>
        </MenuList>
      </Portal>
    </Menu>
  )
})

import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
} from 'src/components/organisms'

type Props = {}

export const Attachment: React.FC<Props> = () => {
  return (
    <Menu isLazy>
      <Tooltip
        hasArrow
        label="Add a file to this task"
        aria-label="Attachment button"
        size="md"
        withIcon
      >
        <MenuButton
          aria-label="Attachment button"
          as={IconButton}
          icon={<Icon icon="attach" color="text.muted" />}
          size="sm"
          variant="ghost"
        />
      </Tooltip>
      <MenuList>
        <MenuGroup title="Attach a File">
          <MenuItem>Your computer</MenuItem>
          <MenuItem>Dropbox</MenuItem>
          <MenuItem>Google Drive</MenuItem>
          <MenuItem>Box</MenuItem>
          <MenuItem>OneDrive/SharePoint</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

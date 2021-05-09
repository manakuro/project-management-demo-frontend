import React, { memo } from 'react'
import { Portal } from 'src/components/atoms'
import { Tooltip, TooltipProps } from 'src/components/molecules'
import { Menu, MenuItem, MenuList, MenuGroup } from 'src/components/organisms'

type Props = {
  label: string
  tooltipSize?: TooltipProps['size']
}

export const AttachmentMenu: React.FC<Props> = memo((props) => {
  return (
    <Menu isLazy>
      <Tooltip
        hasArrow
        label={props.label}
        aria-label="Attachment button"
        size={props.tooltipSize}
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

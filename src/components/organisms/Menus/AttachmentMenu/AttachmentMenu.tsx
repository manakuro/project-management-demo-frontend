import React, { memo } from 'react'
import { FileUploader, FileUploaderParams, Portal } from 'src/components/atoms'
import { Tooltip, TooltipProps } from 'src/components/molecules'
import { Menu, MenuItem, MenuList, MenuGroup } from 'src/components/organisms'
import { useMenuStyle } from 'src/hooks'

type Props = {
  label: string
  tooltip?: Omit<TooltipProps, 'children'>
  onUpload?: (files: FileUploaderParams) => void
}

export const AttachmentMenu: React.FC<Props> = memo((props) => {
  const itemStyle = useMenuStyle().item

  return (
    <Menu isLazy>
      <Tooltip
        hasArrow
        label={props.label}
        aria-label="Attachment button"
        {...props.tooltip}
        withIcon
      >
        {props.children}
      </Tooltip>
      <Portal>
        <MenuList>
          <MenuGroup title="Attach a File">
            <FileUploader
              {...itemStyle}
              id="attach-file-from-your-computer"
              onUpload={props.onUpload}
            >
              Your computer
            </FileUploader>
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
